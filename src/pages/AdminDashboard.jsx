import Sidebar from "../components/common/Sidebar";
import StatsCard from "../components/common/StatsCard";
import { dashboardStats, studentUsers } from "../data/sampleData";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const stats = [
    {
      icon: "👥",
      label: "Total Students",
      value: dashboardStats.totalStudents,
      color: "#667eea",
      trend: "↑ 120",
    },
    {
      icon: "🎯",
      label: "Total Activities",
      value: dashboardStats.totalActivities,
      color: "#f093fb",
      trend: "→ 0 new",
    },
    {
      icon: "🏆",
      label: "Total Achievements",
      value: dashboardStats.totalAchievements,
      color: "#4facfe",
      trend: "↑ 45",
    },
    {
      icon: "⏳",
      label: "Pending Registrations",
      value: dashboardStats.pendingRegistrations,
      color: "#fa709a",
      trend: "↑ 12",
    },
  ];

  return (
    <div className="admin-dashboard">
      <Sidebar role="admin" />

      <main className="admin-content">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Manage college achievements and activities</p>
          </div>
          <div className="admin-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <section className="admin-stats">
          <h2 className="section-title">Dashboard Overview</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2 className="section-title">Management Tools</h2>
          <div className="actions-grid">
            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">👥</span>
                <h3>Manage Students</h3>
              </div>
              <p>View, add, edit, or remove students from the system</p>
              <button className="action-btn primary">View Students</button>
            </div>

            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">🎯</span>
                <h3>Manage Activities</h3>
              </div>
              <p>Create and manage college activities and categories</p>
              <button className="action-btn primary">Manage Activities</button>
            </div>

            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">🏆</span>
                <h3>Award Achievements</h3>
              </div>
              <p>Award achievements and certifications to students</p>
              <button className="action-btn primary">Award Achievement</button>
            </div>

            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">🎉</span>
                <h3>Event Registrations</h3>
              </div>
              <p>View and manage event registrations</p>
              <button className="action-btn primary">View Registrations</button>
            </div>

            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">📊</span>
                <h3>Generate Reports</h3>
              </div>
              <p>Generate achievement and activity reports</p>
              <button className="action-btn primary">Generate Report</button>
            </div>

            <div className="action-box">
              <div className="action-header">
                <span className="action-icon">⚙️</span>
                <h3>System Settings</h3>
              </div>
              <p>Manage system configuration and preferences</p>
              <button className="action-btn primary">Settings</button>
            </div>
          </div>
        </section>

        {/* Recent Students */}
        <section className="recent-section">
          <h2 className="section-title">Recent Students</h2>
          <div className="students-list">
            {studentUsers.map((student) => (
              <div key={student.id} className="student-item">
                <div className="student-avatar">{student.avatar}</div>
                <div className="student-info">
                  <h4>{student.name}</h4>
                  <p>{student.branch}</p>
                  <span className="student-id">{student.collegeId}</span>
                </div>
                <div className="student-actions">
                  <button className="btn-icon">👁️</button>
                  <button className="btn-icon">✏️</button>
                  <button className="btn-icon">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
