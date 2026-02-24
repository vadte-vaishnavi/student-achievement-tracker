import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import StatsCard from "../components/common/StatsCard";
import { studentAchievements, eventsData } from "../data/sampleData";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [studentData] = useState({
    name: "Raj Patel",
    branch: "Computer Science & Engineering",
    year: 3,
    totalActivities: 8,
    totalAwards: 3,
    certifications: 2,
    upcomingEvents: 4,
  });

  const stats = [
    {
      icon: "🎯",
      label: "Total Activities",
      value: studentData.totalActivities,
      color: "#667eea",
      trend: "↑ 2 new",
    },
    {
      icon: "🏆",
      label: "Total Awards",
      value: studentData.totalAwards,
      color: "#f093fb",
      trend: "↑ 1 new",
    },
    {
      icon: "📜",
      label: "Certifications",
      value: studentData.certifications,
      color: "#4facfe",
      trend: "→ 0 new",
    },
    {
      icon: "🎉",
      label: "Upcoming Events",
      value: studentData.upcomingEvents,
      color: "#fa709a",
      trend: "↑ 1 soon",
    },
  ];

  return (
    <div className="student-dashboard">
      <Sidebar role="student" />

      <main className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome back, <span className="highlight">{studentData.name}!</span>
            </h1>
            <p className="welcome-subtitle">
              {studentData.branch} • Year {studentData.year}
            </p>
          </div>
          <div className="welcome-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <section className="stats-section">
          <h2 className="section-title">Your Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="achievements-section">
          <div className="section-header">
            <h2 className="section-title">Recent Achievements</h2>
            <a href="/student/achievements" className="view-all-link">
              View All →
            </a>
          </div>
          <div className="achievements-grid">
            {studentAchievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-header">
                  <span className="achievement-badge">{achievement.badge}</span>
                  <span className="achievement-points">+{achievement.points} pts</span>
                </div>
                <h3 className="achievement-title">{achievement.activity}</h3>
                <p className="achievement-prize">{achievement.prize}</p>
                <p className="achievement-date">{achievement.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="events-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <a href="/student/events" className="view-all-link">
              View All →
            </a>
          </div>
          <div className="events-list">
            {eventsData.slice(0, 3).map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="event-details">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-info">
                    <span>📍 {event.location}</span>
                    <span>🕒 {event.time}</span>
                  </p>
                </div>
                <button className="event-register-btn">Register</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <a href="/student/activities" className="action-card">
              <span className="action-icon">🎯</span>
              <span className="action-label">Browse Activities</span>
            </a>
            <a href="/student/achievements" className="action-card">
              <span className="action-icon">🏆</span>
              <span className="action-label">View Achievements</span>
            </a>
            <a href="/student/stalls" className="action-card">
              <span className="action-icon">🏪</span>
              <span className="action-label">Fest Stalls</span>
            </a>
            <a href="/student/profile" className="action-card">
              <span className="action-icon">👤</span>
              <span className="action-label">Edit Profile</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
