import { Link, useLocation } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { favorites } = useFavoritesContext();
  const { theme, toggle } = useTheme();

  const active = (path) => pathname === path;

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "var(--nav-bg)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)",
      transition: "background-color 0.2s ease",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{
            fontSize: "1.05rem",
            fontWeight: 800,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}>
            MovieVerse
          </span>
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>

          {/* Nav links */}
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
                if (!active(to)) e.currentTarget.style.backgroundColor = "var(--surface2)";
              }}
              onMouseLeave={(e) => {
                if (!active(to)) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: "1px", height: "20px", backgroundColor: "var(--border)", margin: "0 0.25rem" }} />

          {/* Theme toggle */}
          <button className="theme-toggle" onClick={toggle}>
            {theme === "light" ? "Mode sombre" : "Mode clair"}
          </button>
        </div>
      </div>
    </nav>
  );
}
