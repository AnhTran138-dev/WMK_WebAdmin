import { axiosInstance } from "@/configs";
import { LoginRequest } from "@/models/requests";
import { Response, User } from "@/models/responses";

export const authApi = {
  login: (credentials: LoginRequest) => {
    return axiosInstance.post<Response<User>>("/api/auth/login", credentials);
  },
};
