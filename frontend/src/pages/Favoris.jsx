import { Link } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favoris() {
  const { favorites, removeFavorite } = useFavoritesContext();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">
            ❤️ Mes Favoris{" "}
            <span className="text-indigo-400">({favorites.length})</span>
          </h1>
          {favorites.length > 0}
        </div>

        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <p className="text-6xl mb-4">🎞️</p>
            <p className="text-xl font-medium mb-2">Aucun favori pour l'instant</p>
            <p className="text-sm mb-8">
              Parcours les tendances et clique sur 🤍 pour ajouter un film.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition"
            >
              Explorer les tendances
            </Link>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="absolute bottom-12 left-0 right-0 mx-auto w-max opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
