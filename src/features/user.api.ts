import { AxiosResponse } from "axios";
import { axiosInstance } from "../configs";
import { UserRequest } from "../models/requests/user_request";
import { Response, User } from "../models/responses";

export const UserApi = {
  getUserList: () => axiosInstance.get("/api/user/get-all"),

  createUser: (data: UserRequest) =>
    axiosInstance.post("/api/user/create", data),

  updateUser: (id: string, data: UserRequest) =>
    axiosInstance.put(`/api/user/update/${id}`, data),

  changeUserRoles: (
    id: string,
    newRole: number
  ): Promise<AxiosResponse<Response<User>>> =>
    axiosInstance.put(`/api/user/change-role/${id}`, { newRole }),

  changeUserStatus: (id: string) =>
    axiosInstance.put(`/api/user/change-status/${id}`),

  changeUserEmailConfirmed: (id: string) =>
    axiosInstance.put(`/api/user/change-emailconfirm/${id}`),

  deleteUser: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/user/delete/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete user:", error);
      return false;
    }
  },
};
