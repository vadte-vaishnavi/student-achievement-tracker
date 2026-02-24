import { createContext, useState, useContext, useEffect } from "react";
import { studentUsers, adminUsers } from "../data/sampleData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (collegeId, password, role) => {
    let foundUser = null;

    if (role === "student") {
      foundUser = studentUsers.find((u) => u.collegeId === collegeId && u.password === password);
    } else if (role === "admin") {
      foundUser = adminUsers.find((u) => u.collegeId === collegeId && u.password === password);
    }

    if (!foundUser) {
      return false;
    }

    const userData = { ...foundUser, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
