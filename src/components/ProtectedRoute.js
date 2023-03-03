import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const currentUser=localStorage.getItem('key');
 // const { currentUser } = UserAuth();
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
