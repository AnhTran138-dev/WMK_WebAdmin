import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getItem } from "@/lib";
import { jwtDecode } from "jwt-decode";
import { TokenResponse } from "../models/responses";

interface RoleBasedAccessProps {
  roles: string[];
  children: ReactNode;
}

const RoleBasedAccess = ({ roles, children }: RoleBasedAccessProps) => {
  const token = getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  let decodedToken: TokenResponse;
  try {
    decodedToken = jwtDecode(token);
  } catch (e) {
    console.error("Invalid token:", e);
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (!roles.includes(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedAccess;
