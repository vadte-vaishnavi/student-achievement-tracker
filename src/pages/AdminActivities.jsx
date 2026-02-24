import Sidebar from "../components/common/Sidebar";
import "./AdminActivities.css";

export default function AdminActivities() {
  const navigate = require("react-router-dom").useNavigate();
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Manage Activities</h1>
          <p>Create and manage college activities and categories</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <h3>Activities Management</h3>
            <p>Manage all activities available in the system. You can:</p>
            <ul>
              <li>View all activities</li>
              <li>Create new activity categories</li>
              <li>Edit existing activities</li>
              <li>Delete activities</li>
              <li>Set activity requirements and rules</li>
            </ul>
            <button className="admin-btn" onClick={() => navigate("/admin/activities/add")}>Add New Activity</button>
          </div>
        </section>
      </main>
    </div>
  );
}
