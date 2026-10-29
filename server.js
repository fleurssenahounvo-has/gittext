const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('ERREUR: la variable DATABASE_URL est absente. Copiez .env.example vers .env et renseignez votre URL PostgreSQL.');
  process.exit(1);
}
const app = express();
const port = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'disable' ? false : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use(express.static(path.join(__dirname, 'public')));

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(60) UNIQUE NOT NULL,
      name VARCHAR(120) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS platforms (
      id SERIAL PRIMARY KEY,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      name VARCHAR(120) NOT NULL,
      url TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT platforms_url_http CHECK (url ~* '^https?://')
    );
    CREATE INDEX IF NOT EXISTS platforms_category_idx ON platforms(category_id, sort_order);
    CREATE TABLE IF NOT EXISTS suggestions (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      url TEXT NOT NULL,
      category_slug VARCHAR(60) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      email VARCHAR(254),
      status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT suggestions_url_http CHECK (url ~* '^https?://')
    );
  `);
  const count = await pool.query('SELECT COUNT(*)::int AS n FROM categories');
  if (count.rows[0].n === 0) {
    const seed = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'seed-data.json'), 'utf8'));
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const category of seed.categories) {
        await client.query('INSERT INTO categories(slug,name,description,sort_order) VALUES($1,$2,$3,$4) ON CONFLICT(slug) DO NOTHING', [category.slug, category.name, category.description, category.sort_order]);
      }
      for (const platform of seed.platforms) {
        await client.query(`INSERT INTO platforms(category_id,name,url,description,sort_order)
          SELECT id,$1,$2,$3,$4 FROM categories WHERE slug=$5
          ON CONFLICT DO NOTHING`, [platform.name, platform.url, platform.description, platform.sort_order, platform.category_slug]);
      }
      await client.query('COMMIT');
      console.log(`Catalogue initialisé: ${seed.categories.length} catégories, ${seed.platforms.length} plateformes.`);
    } catch (error) { await client.query('ROLLBACK'); throw error; }
    finally { client.release(); }
  }
}

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(503).json({ status: 'error', database: 'unavailable' }); }
});
app.get('/api/catalogue', async (_req, res, next) => {
  try {
    const [cats, sites] = await Promise.all([
      pool.query('SELECT slug,name,description,sort_order FROM categories ORDER BY sort_order,name'),
      pool.query(`SELECT p.id,p.name,p.url,p.description,c.slug AS category_slug
        FROM platforms p JOIN categories c ON c.id=p.category_id
        WHERE p.is_published=TRUE ORDER BY c.sort_order,p.sort_order,p.name`)
    ]);
    res.set('Cache-Control', 'public, max-age=60');
    res.json({ categories: cats.rows, platforms: sites.rows });
  } catch (error) { next(error); }
});
const suggestionLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, message: { error: 'Trop de propositions. Réessayez plus tard.' }, standardHeaders: 'draft-7', legacyHeaders: false });
app.post('/api/suggestions', suggestionLimiter, async (req, res, next) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const url = typeof req.body.url === 'string' ? req.body.url.trim() : '';
  const category = typeof req.body.category_slug === 'string' ? req.body.category_slug.trim() : '';
  const description = typeof req.body.description === 'string' ? req.body.description.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  if (name.length < 2 || name.length > 120 || description.length < 10 || description.length > 1000 || !/^https?:\/\//i.test(url) || url.length > 500 || !category || email.length > 254) {
    return res.status(400).json({ error: 'Vérifiez les champs : nom, URL http(s), catégorie et description (10 à 1000 caractères).' });
  }
  try {
    const exists = await pool.query('SELECT 1 FROM categories WHERE slug=$1', [category]);
    if (!exists.rowCount) return res.status(400).json({ error: 'Catégorie inconnue.' });
    await pool.query('INSERT INTO suggestions(name,url,category_slug,description,email) VALUES($1,$2,$3,$4,$5)', [name,url,category,description,email || null]);
    res.status(201).json({ message: 'Suggestion reçue pour vérification.' });
  } catch (error) { next(error); }
});
app.get('/api/*path', (_req, res) => res.status(404).json({ error: 'Route API introuvable.' }));
app.use((error, _req, res, _next) => {
  console.error('Erreur serveur:', error.message);
  res.status(500).json({ error: 'Une erreur serveur est survenue.' });
});

initDb().then(() => app.listen(port, () => console.log(`Annuaire démarré sur le port ${port}`)))
  .catch(error => { console.error('Initialisation PostgreSQL impossible:', error.message); process.exit(1); });
process.on('SIGTERM', async () => { await pool.end(); process.exit(0); });
