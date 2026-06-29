import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue]   = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => onSearch(value.trim()), 500);
    return () => clearTimeout(t);
  }, [value, onSearch]);

  return (
    <div style={{ position: "relative", flex: 1, maxWidth: "420px" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Rechercher un film..."
        style={{
          width: "100%",
          padding: "0.55rem 2.25rem 0.55rem 0.85rem",
          borderRadius: "7px",
          border: `1.5px solid ${focused ? "var(--accent)" : "var(--border)"}`,
          backgroundColor: "var(--surface)",
          color: "var(--txt)",
          fontSize: "0.875rem",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.15s",
        }}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          aria-label="Effacer"
          style={{
            position: "absolute",
            right: "0.65rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--txt3)",
            fontSize: "0.8rem",
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
