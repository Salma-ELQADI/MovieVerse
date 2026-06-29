import { Link } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favoris() {
  const { favorites, removeFavorite } = useFavoritesContext();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>

      {/* Header */}
      <div style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "2rem 1.5rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--txt)",
            letterSpacing: "-0.025em",
            margin: 0,
          }}>
            Mes favoris
          </h1>
          <p style={{ color: "var(--txt2)", fontSize: "0.875rem", margin: "0.3rem 0 0" }}>
            {favorites.length > 0
              ? `${favorites.length} film${favorites.length > 1 ? "s" : ""} sauvegardé${favorites.length > 1 ? "s" : ""}`
              : "Aucun favori pour l'instant"}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.75rem 1.5rem 4rem" }}>

        {/* Empty state */}
        {favorites.length === 0 && (
          <div style={{
            padding: "4rem 2rem",
            textAlign: "center",
            backgroundColor: "var(--surface)",
            borderRadius: "10px",
            border: "1px solid var(--border)",
          }}>
            <p style={{ fontWeight: 600, color: "var(--txt)", marginBottom: "0.4rem" }}>
              Aucun favori
            </p>
            <p style={{ color: "var(--txt2)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              Parcourez les tendances et cliquez sur le coeur pour sauvegarder un film.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "0.55rem 1.25rem",
                borderRadius: "7px",
                backgroundColor: "var(--accent)",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Voir les tendances
            </Link>
          </div>
        )}

        {/* Grid */}
        {favorites.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            gap: "1rem",
          }}>
            {favorites.map((movie) => (
              <div key={movie.id} style={{ position: "relative" }}>
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeFavorite(movie.id)}
                  style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "5px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface2)",
                    color: "var(--txt2)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    opacity: 0,
                    transition: "opacity 0.15s",
                  }}
                  className="remove-btn"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        div:hover > .remove-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
