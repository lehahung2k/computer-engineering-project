import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ type, ...rest }) {
  const role = sessionStorage.getItem("role");

  if (!role) return <Navigate to="/login"></Navigate>;
  if (role !== type) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin"></Navigate>;
      case "tenant":
        return <Navigate to="/event-admin"></Navigate>;
      case "poc":
        return <Navigate to="/poc"></Navigate>;
      default:
        return <Navigate to="/login"></Navigate>;
    }
  }
  return <Outlet />;
}

export const WelcomeRoute = () => {
  const role = sessionStorage.getItem("role");

  if (!role) return <Outlet />;
  if (role) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin"></Navigate>;
      case "tenant":
        return <Navigate to="/event-admin"></Navigate>;
      case "poc":
        return <Navigate to="/poc"></Navigate>;
      default:
        return <Navigate to="/login"></Navigate>;
    }
  }
};
