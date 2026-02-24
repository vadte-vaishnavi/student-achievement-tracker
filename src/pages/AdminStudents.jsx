import Sidebar from "../components/common/Sidebar";
import "./AdminStudents.css";

export default function AdminStudents() {
  const navigate = require("react-router-dom").useNavigate();
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Manage Students</h1>
          <p>View, add, edit, or remove students from the system</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <h3>Students Management</h3>
            <p>This section allows you to manage all students in the system. You can:</p>
            <ul>
              <li>View all registered students</li>
              <li>Add new students</li>
              <li>Edit student information</li>
              <li>Remove students from the system</li>
              <li>Assign achievements to students</li>
            </ul>
            <button className="admin-btn" onClick={() => navigate("/admin/students/add")}>Add New Student</button>
          </div>
        </section>
      </main>
    </div>
  );
}
