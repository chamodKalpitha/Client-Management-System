import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    toast.error("Please Login");
    return <Navigate to={"/"} replace={true} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    toast.error("You do not have permission to access this page");
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  return <Outlet />;
}
