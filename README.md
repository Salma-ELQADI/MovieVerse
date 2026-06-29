# MovieVerse : **Live Demo:** => https://movie-verse-delta-three.vercel.app/
Application web React pour explorer un catalogue de films, rechercher, filtrer et gérer une liste de favoris — propulsée par l'API publique [TMDB](https://www.themoviedb.org/).

---

## Fonctionnalités

- **Page Tendances** — films tendances de la semaine avec poster, titre, note et date de sortie
- **Recherche** — champ debounced (500ms), recherche par titre, message si aucun résultat
- **Filtres & tri** — filtrer par année, trier par popularité / note / date de sortie
- **Page Détails** — poster, titre, synopsis, genres, durée, note + bouton favori
- **Favoris** — persistance via `localStorage`, ajout/suppression depuis n'importe quelle page
- **Skeleton loading** — placeholders animés pendant le chargement
- **Responsive** — mobile (2 colonnes) → desktop (5 colonnes)
- **Pagination** — bouton "Charger plus"

---

## Installation

### 1. Cloner le repo

```bash
git clone https://github.com/Salma-ELQADI/MovieVerse.git
cd movieverse/frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la clé API

Crée un fichier `.env` à la racine du dossier `frontend/` :

```env
VITE_TMDB_API_KEY=ta_clé_api_tmdb
VITE_TMDB_TOKEN=...
```

> 🔑 Obtiens une clé gratuite sur [developer.themoviedb.org](https://developer.themoviedb.org)

### 4. Lancer l'application

```bash
npm run dev

---

## Stack technique

| Outil | Usage |
|---|---|
| React 19 + Vite | Framework & bundler |
| React Router v7 | Navigation SPA |
| Axios | Appels API |
| Tailwind CSS v3 | Styles |
| LocalStorage | Persistance des favoris |

---

## Structure du projet

```
src/
├── components/
│   ├── Navbar.jsx        # Barre de navigation
│   ├── MovieCard.jsx     # Carte film réutilisable
│   ├── SkeletonCard.jsx  # Placeholder de chargement
│   ├── SearchBar.jsx     # Recherche debounced
│   └── Filters.jsx       # Filtres année + tri
├── context/
│   └── FavoritesContext.jsx  # Context global favoris
├── hooks/
│   └── useFavorites.js   # Hook localStorage
├── pages/
│   ├── Trending.jsx      # Page principale
│   ├── Detail_film.jsx   # Détails d'un film
│   └── Favoris.jsx       # Liste des favoris
└── services/
    └── api.js            # Toutes les fonctions TMDB
```
