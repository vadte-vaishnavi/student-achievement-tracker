import "./ActivityCard.css";

export default function ActivityCard({ activity, onView, onRegister }) {
  return (
    <div className="activity-card" style={{ "--accent-color": activity.color }}>
      <div className="activity-card-header">
        <span className="activity-card-icon">{activity.icon}</span>
        <span className="activity-card-category">{activity.category}</span>
      </div>

      <div className="activity-card-content">
        <h3 className="activity-card-title">{activity.title}</h3>
        <p className="activity-card-description">{activity.description}</p>
      </div>

      <div className="activity-card-footer">
        <button className="activity-card-btn view-btn" onClick={() => onView?.(activity)}>
          View Details
        </button>
        <button className="activity-card-btn register-btn" onClick={() => onRegister?.(activity)}>
          Register
        </button>
      </div>
    </div>
  );
}
