import { useEffect, useCallback, ReactNode } from "react";
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
  const { setData, data: user } = useUserState();
  const token = getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  // Decode the token to get the user's role and other info
  const tokenRewrite: TokenResponse = jwtDecode(token);

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
    const storedToken = getItem("token");
    if (storedToken) {
      fetchUserByToken(storedToken);
    }
  }, [fetchUserByToken]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (
    roles.length > 0 &&
    !roles.includes(
      tokenRewrite[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    )
  ) {
    return <div>Private Page</div>;
  }

  return <div>{children}</div>;
};

export default ProtectRoute;
