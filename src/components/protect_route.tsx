import { useEffect, useCallback, ReactNode, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getItem } from "@/lib";
import { useUserState } from "@/states";
import { UserApi } from "@/features";
import { jwtDecode } from "jwt-decode";
import { TokenResponse } from "@/models/responses";

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectRoute = ({ children, roles = [] }: PrivateRouteProps) => {
  const { setData } = useUserState();
  const token = getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const tokenRewrite: TokenResponse = useMemo(
    () => (token ? jwtDecode(token) : ({} as TokenResponse)),
    [token]
  );

  const fetchUserByToken = useCallback(
    async (token: string) => {
      try {
        const response = await UserApi.getUserByToken(token);
        if (response.data.statusCode === 200) {
          // Set user data including the role from the token
          setData({
            ...response.data.data,
            role: tokenRewrite[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
          });
        } else {
          console.error("Error fetching user by token:", response.data.message);
          navigate("/sign-in", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching user by token:", error);
        navigate("/sign-in", { replace: true });
      }
    },
    [setData, navigate, tokenRewrite]
  );

  useEffect(() => {
    if (token) {
      fetchUserByToken(token);
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [token, fetchUserByToken, navigate]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const userRole =
    tokenRewrite[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  if (roles.length > 0 && !roles.includes(userRole)) {
    return (
      <div className="font-semibold text-center text-gray-400 h-fit">
        <div className="text-4xl">Access Denied</div>
        <div>403 Forbidden</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectRoute;
