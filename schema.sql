-- Les tables sont créées automatiquement au démarrage par server.js.
-- Ce fichier est une référence lisible du schéma.
CREATE TABLE categories (
  id SERIAL PRIMARY KEY, slug VARCHAR(60) UNIQUE NOT NULL, name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE platforms (
  id SERIAL PRIMARY KEY, category_id INTEGER NOT NULL REFERENCES categories(id), name VARCHAR(120) NOT NULL,
  url TEXT NOT NULL CHECK (url ~* '^https?://'), description TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE suggestions (
  id BIGSERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, url TEXT NOT NULL CHECK (url ~* '^https?://'),
  category_slug VARCHAR(60) NOT NULL, description VARCHAR(1000) NOT NULL, email VARCHAR(254),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
