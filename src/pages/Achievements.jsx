import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { achievementsData } from "../data/sampleData";
import "./Achievements.css";

export default function Achievements() {
  const [filterLevel, setFilterLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAchievements = achievementsData.filter((achievement) => {
    const levelMatch = filterLevel === "all" || achievement.level === filterLevel;
    const searchMatch =
      achievement.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.category.toLowerCase().includes(searchTerm.toLowerCase());
    return levelMatch && searchMatch;
  });

  const levels = ["all", ...new Set(achievementsData.map((a) => a.level))];

  return (
    <div className="achievements-page">
      <Sidebar role="student" />

      <main className="achievements-content">
        {/* Header */}
        <div className="achievements-header">
          <h1 className="achievements-title">My Achievements</h1>
          <p className="achievements-subtitle">
            View all your awards, certifications, and recognitions
          </p>
        </div>

        {/* Controls */}
        <div className="achievements-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-group">
            <label htmlFor="level-filter">Level:</label>
            <select
              id="level-filter"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="filter-select"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === "all" ? "All Levels" : level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="achievements-table-wrapper">
          <table className="achievements-table">
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Category</th>
                <th>Award Type</th>
                <th>Level</th>
                <th>Date</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredAchievements.map((achievement) => (
                <tr key={achievement.id}>
                  <td className="activity-name">
                    <span className="activity-badge">🏆</span>
                    {achievement.activityName}
                  </td>
                  <td>
                    <span className="category-tag">{achievement.category}</span>
                  </td>
                  <td className="award-type">{achievement.awardType}</td>
                  <td>
                    <span className={`level-badge level-${achievement.level.toLowerCase()}`}>
                      {achievement.level}
                    </span>
                  </td>
                  <td>{achievement.date}</td>
                  <td>
                    <span className="points-badge">+{achievement.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAchievements.length === 0 && (
            <div className="no-results">
              <p>No achievements found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="achievements-summary">
          <div className="summary-card">
            <span className="summary-icon">🎖️</span>
            <div>
              <p className="summary-label">Total Achievements</p>
              <p className="summary-value">{achievementsData.length}</p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">⭐</span>
            <div>
              <p className="summary-label">Total Points</p>
              <p className="summary-value">
                {achievementsData.reduce((sum, a) => sum + a.points, 0)}
              </p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">🥇</span>
            <div>
              <p className="summary-label">Awards Won</p>
              <p className="summary-value">
                {achievementsData.filter((a) => a.awardType.includes("Prize")).length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
