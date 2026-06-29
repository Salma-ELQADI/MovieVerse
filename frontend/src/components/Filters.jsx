const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularité" },
  { value: "vote_average.desc", label: "Note" },
  { value: "release_date.desc", label: "Date de sortie" },
];

export default function Filters({ year, sortBy, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={year}
        onChange={(e) => onChange({ year: e.target.value, sortBy })}
        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition"
        aria-label="Filtrer par année"
      >
        <option value="">Toutes les années</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onChange({ year, sortBy: e.target.value })}
        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition"
        aria-label="Trier par"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Trier : {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
