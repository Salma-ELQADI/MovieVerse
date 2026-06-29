import { useState, useEffect } from "react";

const STORAGE_KEY = "movieverse_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      isFavorite(movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const removeFavorite = (id) =>
    setFavorites((prev) => prev.filter((m) => m.id !== id));

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}
