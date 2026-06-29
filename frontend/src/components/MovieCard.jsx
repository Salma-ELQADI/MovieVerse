import { Link } from "react-router-dom";
import { imgUrl } from "../services/api";
import { useFavoritesContext } from "../context/FavoritesContext";

const PLACEHOLDER =
  "https://via.placeholder.com/300x450/1e293b/64748b?text=No+Image";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(movie.id);

  const poster = imgUrl(movie.poster_path) || PLACEHOLDER;
  const year = movie.release_date?.slice(0, 4) || "—";
  const rating = movie.vote_average?.toFixed(1) || "—";

  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-200">
      <Link to={`/film/${movie.id}`}>
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          className="w-full aspect-[2/3] object-cover"
        />
      </Link>

      <button
        onClick={() => toggleFavorite(movie)}
        aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur text-lg hover:scale-110 transition-transform"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <div className="p-3">
        <Link to={`/film/${movie.id}`}>
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 hover:text-indigo-400 transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{year}</span>
          <span className="flex items-center gap-1">
            ⭐ <span className="text-yellow-400 font-medium">{rating}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
