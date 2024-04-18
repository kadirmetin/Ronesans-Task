import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const LoginandRegisterProtect = () => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to={"/home"} />;
  }

  return <Outlet />;
};
