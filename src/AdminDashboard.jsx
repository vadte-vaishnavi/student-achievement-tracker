import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "./context/AuthContext";

function AdminDashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([
    { id: 1, name: "Raj Patel", email: "raj.patel@college.edu", achievements: 5 },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@college.edu", achievements: 8 },
    { id: 3, name: "Arjun Kumar", email: "arjun.kumar@college.edu", achievements: 3 },
    { id: 4, name: "Neha Singh", email: "neha.singh@college.edu", achievements: 7 },
    { id: 5, name: "Vikram Patel", email: "vikram.patel@college.edu", achievements: 6 },
    { id: 6, name: "Anjali Verma", email: "anjali.verma@college.edu", achievements: 9 },
    { id: 7, name: "Suresh Reddy", email: "suresh.reddy@college.edu", achievements: 4 },
    { id: 8, name: "Divya Nair", email: "divya.nair@college.edu", achievements: 10 },
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, title: "Academic Excellence", description: "Achieved outstanding grades (CGPA > 8.5)" },
    { id: 2, title: "Team Player", description: "Successfully collaborated on team projects" },
    { id: 3, title: "Innovation Award", description: "Developed innovative solutions" },
    { id: 4, title: "Leadership Certification", description: "Successfully completed leadership training" },
    { id: 5, title: "Sports Champion", description: "Won inter-college sports competition" },
    { id: 6, title: "Cultural Enthusiast", description: "Active participation in cultural events" },
    { id: 7, title: "Coding Expert", description: "Top performer in coding competitions" },
    { id: 8, title: "Social Service Award", description: "Outstanding contribution to social causes" },
  ]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [newAchievement, setNewAchievement] = useState({ title: "", description: "" });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.email) {
      setStudents([...students, { id: Date.now(), ...newStudent, achievements: 0 }]);
      setNewStudent({ name: "", email: "" });
    }
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (newAchievement.title && newAchievement.description) {
      setAchievements([...achievements, { id: Date.now(), ...newAchievement }]);
      setNewAchievement({ title: "", description: "" });
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage achievements, students, and recognition."
      role="admin"
    >
      <div className="admin-header">
        <div className="user-info">
          <span>Logged in as: <strong>{user?.email}</strong></span>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          👥 Students
        </button>
        <button
          className={`tab-btn ${activeTab === "achievements" ? "active" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          🏆 Achievements
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="dashboard-grid">
          <section className="dashboard-card">
            <h3>Overview</h3>
            <div className="dashboard-stats">
              <div className="stat">
                <span className="stat-value">{achievements.length}</span>
                <span className="stat-label">Total achievements</span>
              </div>
              <div className="stat">
                <span className="stat-value">{students.length}</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-value">{students.reduce((sum, s) => sum + s.achievements, 0)}</span>
                <span className="stat-label">Total Awards</span>
              </div>
            </div>
          </section>
          <section className="dashboard-card dashboard-card-wide">
            <h3>Recent Activity</h3>
            <p className="card-muted">
              Manage your student achievements and recognition system. Use the tabs above to:
            </p>
            <ul style={{ marginLeft: "1.5rem", color: "var(--color-text-muted)" }}>
              <li>👥 View and manage all students</li>
              <li>🏆 Create and manage achievement types</li>
              <li>📊 Award achievements to students</li>
            </ul>
          </section>
        </div>
      )}

      {activeTab === "students" && (
        <div className="admin-section">
          <section className="dashboard-card dashboard-card-wide">
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent} className="admin-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Student Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              <button type="submit" className="form-submit">
                Add Student
              </button>
            </form>
          </section>

          <section className="dashboard-card dashboard-card-wide">
            <h3>Student List ({students.length})</h3>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Achievements</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.achievements}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="admin-section">
          <section className="dashboard-card dashboard-card-wide">
            <h3>Create New Achievement</h3>
            <form onSubmit={handleAddAchievement} className="admin-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Achievement Title"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Achievement Description"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  rows="3"
                />
              </div>
              <button type="submit" className="form-submit">
                Create Achievement
              </button>
            </form>
          </section>

          <section className="dashboard-card dashboard-card-wide">
            <h3>Achievement Types ({achievements.length})</h3>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteAchievement(achievement.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
