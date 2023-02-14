import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();
  return currentUser ? <Outlet /> : navigate("/");
};

export default ProtectedRoute;
