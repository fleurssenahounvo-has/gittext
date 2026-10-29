# Annuaire du travail en ligne — Node.js + PostgreSQL

## Architecture
- `public/`: interface HTML/CSS/JavaScript servie par Express.
- `server.js`: API REST et serveur web Node.js/Express.
- `data/seed-data.json`: catalogue initial (8 catégories et 40 plateformes).
- `schema.sql`: référence du schéma PostgreSQL. Les tables sont créées automatiquement au démarrage.
- `DATABASE_URL`: URL de connexion PostgreSQL, gardée côté serveur.

## Fonctionnalités
- `GET /api/health`: vérifie serveur et connexion à PostgreSQL.
- `GET /api/catalogue`: renvoie les catégories et plateformes publiées.
- `POST /api/suggestions`: valide et enregistre une suggestion en attente de modération.
- Le catalogue de départ est inséré automatiquement si la table des catégories est vide.
- Recherche, filtres et favoris dans l'interface.

## Lancer en local (Windows 11)
1. Installez Node.js LTS depuis https://nodejs.org/.
2. Installez PostgreSQL localement depuis https://www.postgresql.org/download/ ou créez une base chez un fournisseur cloud.
3. Ouvrez ce dossier dans VS Code.
4. Copiez `.env.example` en `.env`.
5. Dans Neon, ouvrez **Connect** et copiez la chaîne de connexion **pooled** (avec `-pooler` dans l'hôte). Collez-la dans `DATABASE_URL` dans `.env`. Remplacez d'abord tout mot de passe ou toute clé que vous avez partagés publiquement. Gardez `DATABASE_SSL=require`.
6. Dans le terminal VS Code, lancez `npm install`, puis `npm start`.
7. Ouvrez http://localhost:3000 et vérifiez http://localhost:3000/api/health.

### Exemple de format (valeurs fictives)
`DATABASE_URL=postgresql://mon_user:mon_mot_de_passe@mon-hote:5432/mon_annuaire?sslmode=require`
Ne copiez pas cet exemple tel quel : remplacez-le par les vraies informations de votre fournisseur. Si le mot de passe contient des caractères spéciaux, utilisez de préférence la chaîne de connexion générée par Neon plutôt que de la reconstruire manuellement. Pour Neon, privilégiez l'URL pooled pour cette application.

## Déployer sur Render + PostgreSQL
1. Créez une base PostgreSQL chez un fournisseur compatible, par exemple Neon (https://neon.tech/) ou Render (https://render.com/).
2. Copiez l'URL de connexion **côté serveur** fournie par le fournisseur. Ne la partagez pas dans le code public.
3. Envoyez ce dossier dans un dépôt GitHub privé ou public sans le fichier `.env`.
4. Dans Render, créez un Web Service depuis ce dépôt. Render peut détecter `render.yaml`; sinon, choisissez Node, `npm install` en Build Command et `npm start` en Start Command.
5. Dans Environment, ajoutez `DATABASE_URL` avec l'URL de connexion de la base et `DATABASE_SSL=require` pour une base cloud TLS.
6. Déployez. Au premier démarrage, les tables et le catalogue initial sont créés automatiquement.
7. Ouvrez `https://votre-service.onrender.com/api/health`, puis l'URL principale du service.

Le niveau gratuit et les limites des hébergeurs peuvent changer; consultez leurs conditions actuelles. Le serveur doit être capable de joindre la base PostgreSQL. Si le fournisseur propose plusieurs URL, choisissez celle prévue pour les connexions depuis un serveur externe et respectez ses consignes TLS.

## Sécurité et limites actuelles
- Ne jamais ajouter `.env` au dépôt Git. `DATABASE_URL` ne doit jamais être dans le JavaScript du navigateur. Le fichier `.env.example` ne contient que des valeurs fictives.
- Si une URL de base ou une clé secrète a été partagée dans une conversation, un dépôt ou une capture, considérez-la comme compromise et renouvelez-la dans le fournisseur avant de déployer.
- Les identifiants S3 et Neon Auth ne sont pas utilisés par cette version de l'application ; ne les ajoutez pas pour l'instant.
- Les suggestions publiques sont validées, limitées en fréquence et enregistrées avec le statut `pending`.
- Aucun panneau d'administration public n'est inclus : il faudrait ajouter une authentification avant d'autoriser l'approbation ou la modification des plateformes.
- Les noms, frais, disponibilité par pays et modalités de paiement des plateformes doivent être vérifiés régulièrement.
