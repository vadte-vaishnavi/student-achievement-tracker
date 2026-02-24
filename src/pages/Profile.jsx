import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../DashboardLayout";
import Sidebar from "../components/common/Sidebar";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Achievements", value: user?.achievements || 8 },
    { label: "Activities Joined", value: user?.activitiesJoined || 12 },
    { label: "Events Attended", value: user?.eventsAttended || 6 },
    { label: "Year", value: `Year ${user?.year || 2}` },
  ];

  const recentAchievements = [
    { id: 1, title: "Academic Excellence", date: "2024-12-15", points: 50 },
    { id: 2, title: "Team Player", date: "2024-12-10", points: 30 },
    { id: 3, title: "Innovation Award", date: "2024-12-05", points: 75 },
    { id: 4, title: "Leadership Certification", date: "2024-11-28", points: 60 },
  ];

  return (
    <div className="dashboard-wrapper">
      <Sidebar role="student" />
      <main className="dashboard-content-area">
        <div className="profile-page">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-cover" />
            <div className="profile-container">
              <div className="profile-avatar">{user?.avatar || "👤"}</div>
              <div className="profile-info">
                <h1 className="profile-name">{user?.name || "Student"}</h1>
                <p className="profile-email">{user?.email}</p>
                <p className="profile-college-id">College ID: {user?.collegeId}</p>
              </div>
              <button className="profile-logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <section className="profile-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Personal Information */}
          <section className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <p>{user?.phone || "N/A"}</p>
              </div>
              <div className="info-item">
                <label>Branch</label>
                <p>{user?.branch || "Computer Science & Engineering"}</p>
              </div>
              <div className="info-item">
                <label>Year of Study</label>
                <p>Year {user?.year || 2}</p>
              </div>
              <div className="info-item">
                <label>College ID</label>
                <p>{user?.collegeId}</p>
              </div>
            </div>
          </section>

          {/* Recent Achievements */}
          <section className="profile-section">
            <h2>Recent Achievements</h2>
            <div className="achievements-list">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="achievement-item-profile">
                  <div className="achievement-badge">🏆</div>
                  <div className="achievement-details">
                    <h4>{achievement.title}</h4>
                    <p className="achievement-date">{achievement.date}</p>
                  </div>
                  <div className="achievement-points">+{achievement.points} pts</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;
