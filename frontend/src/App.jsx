import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRole = user?.data?.user?.role || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isAuthenticated &&
      userRole &&
      window.location.pathname !== `/${userRole}`
    ) {
      navigate(`/${userRole}`);
    }
  }, [isAuthenticated, userRole, navigate]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
        <Route path="/instructor" element={<InstructorDashboard />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? `/${userRole}` : "/login"} />}
      />
    </Routes>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
