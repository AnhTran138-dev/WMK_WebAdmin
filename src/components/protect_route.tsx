import { useEffect, useCallback, ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getItem } from "@/lib";
import { useUserState } from "@/states";
import { UserApi } from "@/features";

interface PrivateRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: PrivateRouteProps) => {
  const { setData } = useUserState();
  const token = getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserByToken = useCallback(
    async (token: string) => {
      try {
        const response = await UserApi.getUserByToken(token);
        if (response.data.statusCode === 200) {
          setData(response.data.data);
        } else {
          console.error("Error fetching user by token:", response.data.message);
          navigate("/sign-in", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching user by token:", error);
      }
    },
    [setData, navigate]
  );

  useEffect(() => {
    const storedToken = getItem("token");
    if (storedToken) {
      fetchUserByToken(storedToken);
    }
  }, [fetchUserByToken]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};

export default ProtectRoute;
