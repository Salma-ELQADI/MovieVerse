import { useState } from "react";
import { Link } from "react-router-dom";
import { imgUrl } from "../services/api";
import { useFavoritesContext } from "../context/FavoritesContext";

const PLACEHOLDER = "https://via.placeholder.com/300x450/e7e5e4/a8a29e?text=No+image";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(movie.id);
  const [hovered, setHovered] = useState(false);

  const poster = imgUrl(movie.poster_path) || PLACEHOLDER;
  const year   = movie.release_date?.slice(0, 4) || "—";
  const rating = movie.vote_average?.toFixed(1) || "—";

  return (
    <div
      className="card"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/film/${movie.id}`} style={{ display: "block", overflow: "hidden" }}>
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          style={{
            width: "100%",
            aspectRatio: "2/3",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.35s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </Link>

      <div style={{
        position: "absolute",
        top: "8px",
        left: "8px",
        backgroundColor: "rgba(255,255,255,0.93)",
        borderRadius: "4px",
        padding: "2px 7px",
        fontSize: "0.7rem",
        fontWeight: 700,
        color: "var(--txt)",
      }}>
        {rating}
      </div>

      <button
        onClick={() => toggleFavorite(movie)}
        aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: fav ? "var(--accent)" : "rgba(255,255,255,0.93)",
          color: fav ? "#fff" : "var(--txt2)",
          fontSize: "0.75rem",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
        }}
      >
        {fav ? "♥" : "♡"}
      </button>

      <div style={{ padding: "0.6rem 0.75rem 0.75rem" }}>
        <Link to={`/film/${movie.id}`} style={{ textDecoration: "none" }}>
          <p style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: hovered ? "var(--accent)" : "var(--txt)",
            lineHeight: 1.35,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "color 0.15s",
          }}>
            {movie.title}
          </p>
        </Link>
        <p style={{ fontSize: "0.72rem", color: "var(--txt3)", margin: "4px 0 0", fontWeight: 500 }}>
          {year}
        </p>
      </div>
    </div>
  );
}
