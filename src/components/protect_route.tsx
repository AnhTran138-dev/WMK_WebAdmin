import { getItem } from "@/lib";
import { useUserState } from "@/states";
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: PrivateRouteProps) => {
  const { data: user } = useUserState();
  const token = getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user || token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  if (!user && !token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return <div>{children}</div>;
};

export default ProtectRoute;
