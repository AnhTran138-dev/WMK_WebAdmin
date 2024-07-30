import { axiosInstance } from "../configs";
import {
  UpdateUserRequest,
  UserRequest,
} from "../models/requests/user_request";

export const UserApi = {
  getUserList: () => axiosInstance.get("/api/users/get-all"),

  createUser: (data: UserRequest) =>
    axiosInstance.post("/api/users/create-new", data),

  updateUser: (id: string, data: UpdateUserRequest) =>
    axiosInstance.put(`/api/users/update/${id}`, data),

  changeUserRoles: (id: string, newRole: number) =>
    axiosInstance.put(`/api/users/change-roles`, { id, newRole }),

  changeUserStatus: (id: string) =>
    axiosInstance.put(`/api/users/change-status`, { id }),

  changeUserEmailConfirmed: (id: string) =>
    axiosInstance.put(`/api/users/change-email-confirmed/${id}`),

  deleteUser: (id: string) => axiosInstance.delete(`/api/users/delete/${id}`),
};
