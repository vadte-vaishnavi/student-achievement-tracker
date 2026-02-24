import DashboardLayout from "./DashboardLayout";
import { useAuth } from "./context/AuthContext";

function StudentDashboard() {
  const { logout, user } = useAuth();
  
  const placeholderAchievements = [
    { id: 1, title: "First project completed", category: "Projects", date: "—" },
    { id: 2, title: "Perfect attendance", category: "Attendance", date: "—" },
    { id: 3, title: "Team collaboration", category: "Collaboration", date: "—" },
  ];

  return (
    <DashboardLayout
      title="My Achievements"
      subtitle="Your milestones and recognition."
      role="student"
    >
      <div className="admin-header">
        <div className="user-info">
          <span>Logged in as: <strong>{user?.email}</strong></span>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card dashboard-card-hero">
          <div className="achievement-summary">
            <span className="achievement-badge">🏆</span>
            <div>
              <h3>Your progress</h3>
              <p className="card-muted">You have earned {placeholderAchievements.length} achievement(s).</p>
            </div>
          </div>
        </section>
        <section className="dashboard-card dashboard-card-wide">
          <h3>Recent achievements</h3>
          <ul className="achievement-list">
            {placeholderAchievements.map((a) => (
              <li key={a.id} className="achievement-item">
                <span className="achievement-item-icon">✦</span>
                <div className="achievement-item-body">
                  <strong>{a.title}</strong>
                  <span className="achievement-item-meta">{a.category} · {a.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
