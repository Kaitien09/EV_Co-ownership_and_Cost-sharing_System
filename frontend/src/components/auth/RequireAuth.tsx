import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
