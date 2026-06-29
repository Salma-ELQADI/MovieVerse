export default function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: "var(--surface)",
      borderRadius: "10px",
      overflow: "hidden",
      border: "1px solid var(--border)",
    }}>
      <div className="shimmer" style={{ width: "100%", aspectRatio: "2/3" }} />
      <div style={{ padding: "0.6rem 0.75rem 0.75rem" }}>
        <div className="shimmer" style={{ height: "11px", borderRadius: "4px", width: "75%", marginBottom: "6px" }} />
        <div className="shimmer" style={{ height: "10px", borderRadius: "4px", width: "40%" }} />
      </div>
    </div>
  );
}
