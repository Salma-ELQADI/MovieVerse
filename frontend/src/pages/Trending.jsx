import { useState, useEffect, useCallback } from "react";
import { getTrending, searchMovies, discoverMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = useCallback(async (q, yr, sort, pg) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (q) {
        res = await searchMovies(q, pg);
      } else if (yr || sort !== "popularity.desc") {
        res = await discoverMovies({ year: yr, sortBy: sort, page: pg });
      } else {
        res = await getTrending(pg);
      }
      const data = res.data;
      setMovies(pg === 1 ? data.results : (prev) => [...prev, ...data.results]);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB 
    } catch (err) {
      setError("Impossible de charger les films. Vérifie ta clé API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset to page 1 whenn filters change
  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies(query, year, sortBy, 1);
  }, [query, year, sortBy, fetchMovies]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(query, year, sortBy, page);
  }, [page, fetchMovies, query, year, sortBy]);

  const handleSearch = useCallback((q) => setQuery(q), []);

  const handleFilterChange = ({ year: yr, sortBy: sort }) => {
    setYear(yr);
    setSortBy(sort);
  };

  const loadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const title = query
    ? `Résultats pour "${query}"`
    : year || sortBy !== "popularity.desc"
    ? "Films filtrés"
    : "Tendances cette semaine";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!query && !year && sortBy === "popularity.desc" && (
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-400 to-transparent" />
          <div className="relative text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              MovieVerse
            </h1>
            <p className="mt-2 text-gray-300 text-sm md:text-base">
              Explore les films tendances, recherche, filtre et sauvegarde tes favoris.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <SearchBar onSearch={handleSearch} />
          <Filters year={year} sortBy={sortBy} onChange={handleFilterChange} />
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-100">{title}</h2>

        {error && (
          <div className="text-center py-16 text-red-400">
            <p className="text-4xl mb-3">⚠️</p>
            <p>{error}</p>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} />
              ))}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🎞️</p>
            <p className="text-lg">Aucun film trouvé.</p>
            {query && (
              <p className="text-sm mt-1">
                Essaie un autre titre ou vérifie l'orthographe.
              </p>
            )}
          </div>
        )}

        {!loading && !error && movies.length > 0 && page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
