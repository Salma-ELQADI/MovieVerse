import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Trending from "./pages/Trending";
import DetailFilm from "./pages/Detail_film";
import Favoris from "./pages/Favoris";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
            <Navbar />
            <Routes>
              <Route path="/"         element={<Trending />} />
              <Route path="/film/:id" element={<DetailFilm />} />
              <Route path="/favoris"  element={<Favoris />} />
              <Route path="*" element={
                <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: "4rem", fontWeight: 800, color: "var(--txt)", lineHeight: 1 }}>404</p>
                    <p style={{ color: "var(--txt2)", marginTop: "0.5rem" }}>Page introuvable.</p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
