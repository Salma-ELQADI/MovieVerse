import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: "fr-FR" },
});

export const getTrending = (page = 1) =>
  tmdb.get("/trending/movie/week", { params: { page } });

export const searchMovies = (query, page = 1) =>
  tmdb.get("/search/movie", { params: { query, page } });

export const getMovieDetails = (id) => tmdb.get(`/movie/${id}`);

export const discoverMovies = ({ year, sortBy = "popularity.desc", page = 1 }) =>
  tmdb.get("/discover/movie", {
    params: {
      sort_by: sortBy,
      primary_release_year: year || undefined,
      page,
    },
  });

// image helpeeer
export const imgUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
