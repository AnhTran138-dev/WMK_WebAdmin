import { getItem } from "@/lib";
import { useUserState } from "@/states";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: PrivateRouteProps) => {
  const { data: user } = useUserState();
  const token = getItem("token");
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};

export default ProtectRoute;
