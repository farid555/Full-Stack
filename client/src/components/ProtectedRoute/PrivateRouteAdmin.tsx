import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";

const ProtectedRouteAdmin = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role == "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteAdmin;
