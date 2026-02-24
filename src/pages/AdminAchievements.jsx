import Sidebar from "../components/common/Sidebar";
import "./AdminAchievements.css";

export default function AdminAchievements() {
  const navigate = require("react-router-dom").useNavigate();
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Award Achievements</h1>
          <p>Assign achievements and certifications to students</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <h3>Achievements Management</h3>
            <p>Award achievements to students. You can:</p>
            <ul>
              <li>View all available achievements</li>
              <li>Create new achievement types</li>
              <li>Award achievements to students</li>
              <li>View achievement statistics</li>
              <li>Manage achievement categories</li>
            </ul>
            <button className="admin-btn" onClick={() => navigate("/admin/achievements/award")}>Award Achievement</button>
          </div>
        </section>
      </main>
    </div>
  );
}
