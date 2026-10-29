const state = { category: 'all', query: '', favoritesOnly: false, favorites: new Set() };
const $ = (id) => document.getElementById(id);
const list = $('list');
const tiles = $('tiles');
const count = $('count');
const reset = $('reset');
const favoritesToggle = $('favoritesToggle');
let categories = [];
let platforms = [];

function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function loadFavorites() {
  try { state.favorites = new Set(JSON.parse(localStorage.getItem('annuaire-favoris-v2') || '[]')); }
  catch { state.favorites = new Set(); }
}
function saveFavorites() {
  try { localStorage.setItem('annuaire-favoris-v2', JSON.stringify([...state.favorites])); } catch {}
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function drawCategories() {
  tiles.replaceChildren();
  const all = el('button', 'tile');
  all.type = 'button'; all.setAttribute('aria-pressed', String(state.category === 'all'));
  all.append(el('b', '', 'Toutes les catégories'), el('span', '', `${platforms.length} sites`));
  all.addEventListener('click', () => { state.category = 'all'; render(); });
  tiles.append(all);
  categories.forEach(category => {
    const button = el('button', 'tile');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(state.category === category.slug));
    button.append(el('b', '', category.name), el('span', '', `${platforms.filter(p => p.category_slug === category.slug).length} sites`));
    button.addEventListener('click', () => {
      state.category = state.category === category.slug ? 'all' : category.slug;
      render();
      if (state.category !== 'all') list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    tiles.append(button);
  });
}
function render() {
  drawCategories();
  list.replaceChildren();
  const q = normalize(state.query);
  const visible = platforms.filter(p => {
    const category = categories.find(c => c.slug === p.category_slug);
    const matchesCategory = state.category === 'all' || state.category === p.category_slug;
    const matchesQuery = !q || normalize(`${p.name} ${p.url} ${p.description} ${category?.name || ''}`).includes(q);
    const matchesFavorite = !state.favoritesOnly || state.favorites.has(p.id);
    return matchesCategory && matchesQuery && matchesFavorite;
  });
  count.textContent = `${visible.length} site${visible.length > 1 ? 's' : ''} affiché${visible.length > 1 ? 's' : ''}`;
  $('nsites').textContent = platforms.length;
  $('ncats').textContent = categories.length;
  reset.hidden = state.category === 'all' && !q && !state.favoritesOnly;
  favoritesToggle.textContent = state.favoritesOnly ? '★ Afficher tout' : '☆ Mes favoris';
  favoritesToggle.setAttribute('aria-pressed', String(state.favoritesOnly));
  categories.forEach(category => {
    const items = visible.filter(p => p.category_slug === category.slug);
    if (!items.length) return;
    const section = el('section', 'cat');
    section.append(el('h3', '', category.name), el('p', 'sub', category.description));
    const grid = el('div', 'grid');
    items.forEach(platform => {
      const card = el('article', 'card');
      card.append(el('h4', '', platform.name), el('p', '', platform.description));
      const link = el('a', '', 'Visiter le site');
      link.href = platform.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Visiter le site ${platform.name}`);
      const favorite = el('button', 'favorite-button', state.favorites.has(platform.id) ? '★ Ajouté aux favoris' : '☆ Ajouter aux favoris');
      favorite.type = 'button'; favorite.setAttribute('aria-pressed', String(state.favorites.has(platform.id)));
      favorite.addEventListener('click', () => {
        state.favorites.has(platform.id) ? state.favorites.delete(platform.id) : state.favorites.add(platform.id);
        saveFavorites(); render();
      });
      card.append(link, favorite); grid.append(card);
    });
    section.append(grid); list.append(section);
  });
  if (!visible.length) list.append(el('p', 'empty', state.favoritesOnly ? 'Aucun favori pour le moment. Ajoutez une plateforme avec le bouton ☆.' : 'Aucun résultat. Essayez un autre mot ou cliquez sur « Tout afficher ».'));
}
async function loadData() {
  try {
    const response = await fetch('/api/catalogue');
    if (!response.ok) throw new Error('Erreur API');
    const data = await response.json();
    categories = data.categories;
    platforms = data.platforms;
    render();
  } catch (error) {
    list.replaceChildren(el('p', 'empty', 'Impossible de charger le catalogue. Vérifiez que le serveur et la base de données sont démarrés.'));
    count.textContent = 'Catalogue indisponible';
  }
}
$('q').addEventListener('input', event => { state.query = event.target.value; render(); });
reset.addEventListener('click', () => { state.category = 'all'; state.query = ''; state.favoritesOnly = false; $('q').value = ''; render(); });
favoritesToggle.addEventListener('click', () => { state.favoritesOnly = !state.favoritesOnly; state.category = 'all'; render(); });
$('suggestionForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $('formStatus');
  const submit = form.querySelector('button[type="submit"]');
  status.textContent = 'Envoi en cours…'; submit.disabled = true;
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch('/api/suggestions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Envoi impossible');
    form.reset(); status.textContent = 'Merci ! Votre suggestion a été envoyée pour vérification.';
  } catch (error) { status.textContent = error.message || 'Une erreur est survenue. Réessayez plus tard.'; }
  finally { submit.disabled = false; }
});
loadFavorites();
$('year').textContent = new Date().getFullYear();
loadData();
