import { Link, useLocation } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { favorites } = useFavoritesContext();

  const active = (path) => pathname === path;

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "1.05rem",
            fontWeight: 800,
            color: "var(--txt)",
            letterSpacing: "-0.02em",
          }}>
            MovieVerse
          </span>
        </Link>

        <div style={{ display: "flex", gap: "0.25rem" }}>
          {[
            { to: "/",        label: "Tendances" },
            { to: "/favoris", label: `Favoris${favorites.length > 0 ? ` (${favorites.length})` : ""}` },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                padding: "0.4rem 0.9rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "background 0.15s, color 0.15s",
                backgroundColor: active(to) ? "var(--accent-light)" : "transparent",
                color: active(to) ? "var(--accent)" : "var(--txt2)",
              }}
              onMouseEnter={(e) => {
                if (!active(to)) e.currentTarget.style.backgroundColor = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                if (!active(to)) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
