import { useState, useEffect, useCallback } from "react";
import { getTrending, searchMovies, discoverMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Trending() {
  const [movies, setMovies]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [query, setQuery]           = useState("");
  const [year, setYear]             = useState("");
  const [sortBy, setSortBy]         = useState("popularity.desc");
  const [page, setPage]             = useState(1);
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
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (err) {
      setError("Impossible de charger les films. Vérifie ta clé API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies(query, year, sortBy, 1);
  }, [query, year, sortBy, fetchMovies]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(query, year, sortBy, page);
  }, [page, fetchMovies, query, year, sortBy]);

  const handleSearch       = useCallback((q) => setQuery(q), []);
  const handleFilterChange = ({ year: yr, sortBy: sort }) => { setYear(yr); setSortBy(sort); };

  const isDefault = !query && !year && sortBy === "popularity.desc";

  const sectionTitle = query
    ? `Résultats pour "${query}"`
    : year || sortBy !== "popularity.desc"
    ? "Films filtrés"
    : "Tendances cette semaine";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>

      {isDefault && (
        <div style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "3rem 1.5rem",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--txt)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}>
              Les films du moment
            </h1>
            <p style={{
              marginTop: "0.6rem",
              color: "var(--txt2)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: "0.6rem auto 0",
            }}>
              Explorez les tendances de la semaine, recherchez un titre, filtrez par année et sauvegardez vos favoris.
            </p>
          </div>
        </div>
      )}

      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0.75rem 1.5rem",
        position: "sticky",
        top: "60px",
        zIndex: 40,
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}>
          <SearchBar onSearch={handleSearch} />
          <Filters year={year} sortBy={sortBy} onChange={handleFilterChange} />
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.75rem 1.5rem 4rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--txt)", margin: 0 }}>
            {sectionTitle}
          </h2>
          {!loading && movies.length > 0 && (
            <span style={{
              fontSize: "0.75rem",
              color: "var(--txt3)",
              fontWeight: 500,
            }}>
              {movies.length} résultats
            </span>
          )}
        </div>

        {error && (
          <div style={{
            padding: "2rem",
            borderRadius: "8px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: "0.875rem",
          }}>
            {error}
          </div>
        )}

        {!error && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            gap: "1rem",
          }}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {loading && Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div style={{
            padding: "4rem 2rem",
            textAlign: "center",
            color: "var(--txt2)",
            fontSize: "0.9rem",
          }}>
            <p style={{ fontWeight: 600, color: "var(--txt)", marginBottom: "0.25rem" }}>
              Aucun résultat
            </p>
            {query && <p>Essaie un autre titre.</p>}
          </div>
        )}

        {!loading && !error && movies.length > 0 && page < totalPages && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                padding: "0.6rem 1.75rem",
                borderRadius: "7px",
                border: "1.5px solid var(--border)",
                backgroundColor: "var(--surface)",
                color: "var(--txt)",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--txt)";
              }}
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
