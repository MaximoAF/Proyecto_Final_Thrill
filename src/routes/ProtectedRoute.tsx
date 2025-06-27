import { FC, JSX } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
  children: JSX.Element;
  isAllowed: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  isAllowed,
  redirectTo = "/",
}) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
};
