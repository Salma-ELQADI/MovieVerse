import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher un film..."
        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          aria-label="Effacer"
        >
          ✕
        </button>
      )}
    </div>
  );
}
