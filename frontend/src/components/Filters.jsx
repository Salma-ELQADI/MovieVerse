const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

const SORT_OPTIONS = [
  { value: "popularity.desc",   label: "Popularité" },
  { value: "vote_average.desc", label: "Note"        },
  { value: "release_date.desc", label: "Date"        },
];

const selectStyle = {
  padding: "0.55rem 0.85rem",
  borderRadius: "7px",
  border: "1.5px solid var(--border)",
  backgroundColor: "var(--surface)",
  color: "var(--txt)",
  fontSize: "0.875rem",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer",
  transition: "border-color 0.15s",
};

export default function Filters({ year, sortBy, onChange }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <select
        value={year}
        onChange={(e) => onChange({ year: e.target.value, sortBy })}
        aria-label="Filtrer par année"
        style={selectStyle}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
      >
        <option value="">Toutes les années</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onChange({ year, sortBy: e.target.value })}
        aria-label="Trier par"
        style={selectStyle}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
