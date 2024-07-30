import { axiosInstance } from "@/configs";
import { LoginRequest } from "@/models/requests";
import { Response, User } from "@/models/responses";
import { AxiosResponse } from "axios";

export const authApi = {
  login: (
    credentials: LoginRequest
  ): Promise<AxiosResponse<Response<User>>> => {
    return axiosInstance.post<Response<User>>("/api/auth/login", credentials);
  },
};
