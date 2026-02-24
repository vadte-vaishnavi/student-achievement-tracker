import { Link, useNavigate, useLocation } from "react-router-dom";
import "./DashboardLayout.css";

export default function DashboardLayout({ title, subtitle, children, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo">
          <span className="dashboard-logo-icon">✦</span>
          <span>Student Achievements</span>
        </Link>
        <nav className="dashboard-nav">
          {role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`dashboard-nav-link ${location.pathname === "/admin" ? "active" : ""}`}
              >
                Dashboard
              </Link>
              <span className="dashboard-nav-label">Admin</span>
            </>
          )}
          {role === "student" && (
            <>
              <Link
                to="/student"
                className={`dashboard-nav-link ${location.pathname === "/student" ? "active" : ""}`}
              >
                My Achievements
              </Link>
              <span className="dashboard-nav-label">Student</span>
            </>
          )}
        </nav>
        <div className="dashboard-sidebar-footer">
          <button
            type="button"
            className="dashboard-back"
            onClick={() => navigate("/")}
          >
            ← Back to home
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          </div>
        </header>
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}
