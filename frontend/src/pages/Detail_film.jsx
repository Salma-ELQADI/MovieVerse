import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, imgUrl } from "../services/api";
import { useFavoritesContext } from "../context/FavoritesContext";
import SkeletonCard from "../components/SkeletonCard";

const PLACEHOLDER_BG =
  "https://via.placeholder.com/1280x720/1e293b/64748b?text=No+Backdrop";
const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/400x600/1e293b/64748b?text=No+Image";

export default function DetailFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError("Film introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-xl mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition"
          >
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  const fav = isFavorite(movie.id);
  const backdrop = imgUrl(movie.backdrop_path, "w1280") || PLACEHOLDER_BG;
  const poster = imgUrl(movie.poster_path) || PLACEHOLDER_POSTER;
  const year = movie.release_date?.slice(0, 4) || "—";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
    : "—";
  const rating = movie.vote_average?.toFixed(1) || "—";
  const genres = movie.genres?.map((g) => g.name).join(", ") || "—";

  const movieSnippet = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="relative h-72 md:h-96">
        <img
          src={backdrop}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          ← Retour
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-32 relative pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={poster}
            alt={movie.title}
            className="w-48 md:w-64 rounded-2xl shadow-2xl flex-shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-1 text-indigo-400 italic text-sm">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
              <span> {year}</span>
              <span> {runtime}</span>
              <span> <span className="text-yellow-400 font-bold">{rating}</span> / 10</span>
              <span> {genres}</span>
            </div>

            <button
              onClick={() => toggleFavorite(movieSnippet)}
              className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                fav
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {fav ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
            </button>

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {movie.overview || "Aucun synopsis disponible."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
