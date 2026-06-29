import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Trending from "./pages/Trending";
import DetailFilm from "./pages/Detail_film";
import Favoris from "./pages/Favoris";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen bg-gray-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/film/:id" element={<DetailFilm />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-[60vh] text-white text-center">
                  <div>
                    <p className="text-6xl mb-4">404</p>
                    <p className="text-gray-400">Page introuvable.</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}
