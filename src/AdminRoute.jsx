import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/auth";
import { AuthContext } from "./components/providers/AuthProvider";

import Loading from "./pages/Loading/Loading";

const AdminRoute = ({ children }) => {
  if (isAuthenticated()) {
    if (isAdmin()) {
      return children;
    } else {
      return <Navigate state={location.pathname} to="/"></Navigate>;
    }
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoute;
