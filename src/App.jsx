import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./Login";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import Activities from "./pages/Activities";
import Achievements from "./pages/Achievements";
import Events from "./pages/Events";
import FestStalls from "./pages/FestStalls";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminActivities from "./pages/AdminActivities";
import AdminAchievements from "./pages/AdminAchievements";
import AdminEvents from "./pages/AdminEvents";
import AdminReports from "./pages/AdminReports";
import AdminAddStudent from "./pages/AdminAddStudent";
import AdminAddActivity from "./pages/AdminAddActivity";
import AdminAwardAchievement from "./pages/AdminAwardAchievement";
import AdminCreateEvent from "./pages/AdminCreateEvent";

// Protected Route Component
function ProtectedRoute({ element, allowedRole }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
          <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Student Routes */}
      <Route
        path="/student"
        element={<Navigate to="/student/dashboard" replace />}
      />
      <Route
        path="/student/dashboard"
        element={<ProtectedRoute element={<StudentDashboard />} allowedRole="student" />}
      />
      <Route
        path="/student/activities"
        element={<ProtectedRoute element={<Activities />} allowedRole="student" />}
      />
      <Route
        path="/student/achievements"
        element={<ProtectedRoute element={<Achievements />} allowedRole="student" />}
      />
      <Route
        path="/student/events"
        element={<ProtectedRoute element={<Events />} allowedRole="student" />}
      />
      <Route
        path="/student/stalls"
        element={<ProtectedRoute element={<FestStalls />} allowedRole="student" />}
      />
      <Route
        path="/student/profile"
        element={<ProtectedRoute element={<Profile />} allowedRole="student" />}
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />}
      />
      <Route
        path="/admin/students"
        element={<ProtectedRoute element={<AdminStudents />} allowedRole="admin" />}
      />
      <Route
        path="/admin/students/add"
        element={<ProtectedRoute element={<AdminAddStudent />} allowedRole="admin" />}
      />
      <Route
        path="/admin/activities"
        element={<ProtectedRoute element={<AdminActivities />} allowedRole="admin" />}
      />
      <Route
        path="/admin/activities/add"
        element={<ProtectedRoute element={<AdminAddActivity />} allowedRole="admin" />}
      />
      <Route
        path="/admin/achievements"
        element={<ProtectedRoute element={<AdminAchievements />} allowedRole="admin" />}
      />
      <Route
        path="/admin/achievements/award"
        element={<ProtectedRoute element={<AdminAwardAchievement />} allowedRole="admin" />}
      />
      <Route
        path="/admin/events"
        element={<ProtectedRoute element={<AdminEvents />} allowedRole="admin" />}
      />
      <Route
        path="/admin/events/create"
        element={<ProtectedRoute element={<AdminCreateEvent />} allowedRole="admin" />}
      />
      <Route
        path="/admin/reports"
        element={<ProtectedRoute element={<AdminReports />} allowedRole="admin" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;