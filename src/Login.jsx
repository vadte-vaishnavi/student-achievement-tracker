import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState("role-select"); // role-select, login
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!collegeId || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = login(collegeId, password, role);
    if (result) {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
      }, 800);
    } else {
      setError("Invalid College ID or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-shape login-bg-shape-1" />
        <div className="login-bg-shape login-bg-shape-2" />
        <div className="login-bg-shape login-bg-shape-3" />
      </div>

      <main className="login-main">
        {/* Header */}
        <header className="login-header">
          <span className="login-badge">🎓 SEAMS</span>
          <h1 className="login-title">
            Student Extracurricular <em>Achievement</em> Management System
          </h1>
          <p className="login-subtitle">
            Track progress, celebrate achievements, and build excellence together
          </p>
        </header>

        {/* Role Selection */}
        {mode === "role-select" && (
          <div className="login-container">
            <h2 className="login-form-title">Welcome! Choose Your Role</h2>
            <div className="login-cards">
              <button
                type="button"
                className="login-card login-card-admin"
                onClick={() => {
                  setRole("admin");
                  setMode("login");
                  setError("");
                  setCollegeId("");
                  setPassword("");
                }}
              >
                <span className="login-card-icon" aria-hidden>
                  👨‍💼
                </span>
                <h3>Administrator</h3>
                <p>Manage activities, students, and achievements</p>
                <span className="login-card-cta">Login as Admin →</span>
              </button>

              <button
                type="button"
                className="login-card login-card-student"
                onClick={() => {
                  setRole("student");
                  setMode("login");
                  setError("");
                  setCollegeId("");
                  setPassword("");
                }}
              >
                <span className="login-card-icon" aria-hidden>
                  👨‍🎓
                </span>
                <h3>Student</h3>
                <p>View achievements, register for events</p>
                <span className="login-card-cta">Login as Student →</span>
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-header">
                <button
                  type="button"
                  className="form-back-btn"
                  onClick={() => {
                    setMode("role-select");
                    setError("");
                    setCollegeId("");
                    setPassword("");
                  }}
                >
                  ← Back
                </button>
                <h2 className="login-form-title">
                  {role === "admin" ? "Admin Login" : "Student Login"}
                </h2>
              </div>

              {error && <div className="form-error">{error}</div>}
              {success && <div className="form-success">{success}</div>}

              <div className="form-group">
                <label htmlFor="college-id">College ID</label>
                <input
                  id="college-id"
                  type="text"
                  placeholder={role === "admin" ? "ADMIN001" : "CSE001"}
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value.toUpperCase())}
                  className="form-input"
                />
                <p className="form-hint">
                  {role === "admin" ? "Demo: ADMIN001" : "Demo: CSE001"}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
                <p className="form-hint">
                  {role === "admin" ? "Demo: admin123" : "Demo: student123"}
                </p>
              </div>

              <button type="submit" className="form-submit">
                {role === "admin" ? "Login as Admin" : "Login as Student"}
              </button>

              <div className="form-divider">
                <span>Credentials Demo</span>
              </div>

              <div className="demo-credentials">
                <div className="demo-item">
                  <strong>Student:</strong>
                  <p>ID: CSE001 | Pass: student123</p>
                </div>
                <div className="demo-item">
                  <strong>Admin:</strong>
                  <p>ID: ADMIN001 | Pass: admin123</p>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <p>© 2024 Student Achievement Management System | College Edition</p>
      </footer>
    </div>
  );
}

export default Login;
