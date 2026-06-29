import { Link, useLocation } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { favorites } = useFavoritesContext();

  const linkClass = (path) =>
    `px-3 py-1 rounded-lg font-medium transition-colors ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-400 tracking-tight">
          MovieVerse
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" className={linkClass("/")}>
            Tendances
          </Link>
          <Link to="/favoris" className={linkClass("/favoris")}>
            ❤️ Favoris
            {favorites.length > 0 && (
              <span className="ml-1.5 bg-indigo-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
