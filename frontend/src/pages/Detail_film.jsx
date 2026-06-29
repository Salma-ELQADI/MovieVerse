import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, imgUrl } from "../services/api";
import { useFavoritesContext } from "../context/FavoritesContext";
import SkeletonCard from "../components/SkeletonCard";

const PLACEHOLDER_BG     = "https://via.placeholder.com/1280x720/e7e5e4/a8a29e?text=No+backdrop";
const PLACEHOLDER_POSTER = "https://via.placeholder.com/400x600/e7e5e4/a8a29e?text=No+image";

export default function DetailFilm() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const [movie,     setMovie]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setImgLoaded(false);
    getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError("Film introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", maxWidth: "600px", width: "100%", padding: "0 1.5rem" }}>
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--txt2)", fontSize: "1rem", marginBottom: "1rem" }}>{error}</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "7px",
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--txt)",
              fontSize: "0.875rem",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const fav      = isFavorite(movie.id);
  const backdrop = imgUrl(movie.backdrop_path, "w1280") || PLACEHOLDER_BG;
  const poster   = imgUrl(movie.poster_path)            || PLACEHOLDER_POSTER;
  const year     = movie.release_date?.slice(0, 4)      || "—";
  const runtime  = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
    : "—";
  const rating   = movie.vote_average?.toFixed(1) || "—";

  const movieSnippet = {
    id: movie.id, title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>

      {/* Backdrop */}
      <div style={{ position: "relative", height: "clamp(200px, 38vw, 420px)", overflow: "hidden" }}>
        {!imgLoaded && <div className="shimmer" style={{ position: "absolute", inset: 0 }} />}
        <img
          src={backdrop}
          alt=""
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
        }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", top: "1rem", left: "1rem",
            padding: "0.45rem 1rem",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            backdropFilter: "blur(8px)",
            color: "var(--txt)",
            fontSize: "0.82rem",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "background 0.15s",
            opacity: 0.9,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
        >
          Retour
        </button>
      </div>

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 1.5rem 5rem",
        marginTop: "clamp(-80px, -10vw, -120px)",
        position: "relative",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-end" }}>

          <img
            src={poster}
            alt={movie.title}
            style={{
              width: "clamp(120px, 18vw, 200px)",
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              border: "3px solid var(--surface)",
            }}
          />

          <div style={{ flex: 1, minWidth: "200px" }}>
            <h1 style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--txt)",
              lineHeight: 1.15,
              margin: 0,
            }}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p style={{ fontSize: "0.875rem", fontStyle: "italic", color: "var(--txt2)", margin: "0.4rem 0 0" }}>
                {movie.tagline}
              </p>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
              {[year, runtime, `${rating} / 10`].map((val) => (
                <span key={val} style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "5px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--txt2)",
                }}>
                  {val}
                </span>
              ))}
            </div>

            {movie.genres?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.6rem" }}>
                {movie.genres.map((g) => (
                  <span key={g.id} style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "5px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent)",
                  }}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={() => toggleFavorite(movieSnippet)}
              style={{
                marginTop: "1.25rem",
                padding: "0.6rem 1.4rem",
                borderRadius: "7px",
                border: fav ? "1.5px solid #fca5a5" : "1.5px solid var(--accent)",
                backgroundColor: fav ? "#fef2f2" : "var(--accent)",
                color: fav ? "#b91c1c" : "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {fav ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
          </div>
        </div>

        <div style={{
          marginTop: "2rem",
          backgroundColor: "var(--surface)",
          borderRadius: "10px",
          padding: "1.5rem",
          border: "1px solid var(--border)",
        }}>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--txt)", margin: "0 0 0.75rem" }}>
            Synopsis
          </h2>
          <p style={{
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "var(--txt2)",
            margin: 0,
          }}>
            {movie.overview || "Aucun synopsis disponible pour ce film."}
          </p>
        </div>
      </div>
    </div>
  );
}
