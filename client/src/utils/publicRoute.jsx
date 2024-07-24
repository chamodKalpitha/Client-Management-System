import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
