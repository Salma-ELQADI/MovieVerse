import { createContext, useContext } from "react";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favoritesApi = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesApi}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavoritesContext = () => useContext(FavoritesContext);
