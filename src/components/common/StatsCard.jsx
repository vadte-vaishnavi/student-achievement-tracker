import "./StatsCard.css";

export default function StatsCard({ icon, label, value, color = "#667eea", trend }) {
  return (
    <div className="stats-card" style={{ "--card-color": color }}>
      <div className="stats-card-header">
        <div className="stats-card-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className="stats-card-trend">{trend}</div>
      </div>
      <div className="stats-card-content">
        <p className="stats-card-value">{value}</p>
        <p className="stats-card-label">{label}</p>
      </div>
    </div>
  );
}
