import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const studentMenuItems = [
    { label: "Dashboard", icon: "📊", path: "/student/dashboard" },
    { label: "Activities", icon: "🎯", path: "/student/activities" },
    { label: "Achievements", icon: "🏆", path: "/student/achievements" },
    { label: "Events", icon: "🎉", path: "/student/events" },
    { label: "Fest Stalls", icon: "🏪", path: "/student/stalls" },
    { label: "Profile", icon: "👤", path: "/student/profile" },
  ];

  const adminMenuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { label: "Students", icon: "👥", path: "/admin/students" },
    { label: "Activities", icon: "🎯", path: "/admin/activities" },
    { label: "Achievements", icon: "🏆", path: "/admin/achievements" },
    { label: "Events", icon: "🎉", path: "/admin/events" },
    { label: "Reports", icon: "📈", path: "/admin/reports" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : studentMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">🎓</span>
            <span className="sidebar-logo-text">SEAMS</span>
          </div>
          <button className="sidebar-close" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user?.avatar || "👤"}</div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.name}</p>
            <p className="sidebar-user-role">{role === "admin" ? "Administrator" : "Student"}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="sidebar-nav-item"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
