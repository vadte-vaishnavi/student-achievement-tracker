import Sidebar from "../components/common/Sidebar";
import "./AdminEvents.css";

export default function AdminEvents() {
  const navigate = require("react-router-dom").useNavigate();
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Manage Events</h1>
          <p>Create and manage college events and registrations</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <h3>Events Management</h3>
            <p>Organize and manage all college events. You can:</p>
            <ul>
              <li>Create new events</li>
              <li>Set event dates and times</li>
              <li>Manage event registrations</li>
              <li>View attendance records</li>
              <li>Update event status</li>
            </ul>
            <button className="admin-btn" onClick={() => navigate("/admin/events/create")}>Create Event</button>
          </div>
        </section>
      </main>
    </div>
  );
}
