import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "../configs";
import { UserRequest } from "../models/requests/user_request";
import { Response, User } from "../models/responses";

export const UserApi = {
  getUserList: () => axiosInstance.get("/api/user/get-all"),

  getUserByToken: (token: string): Promise<AxiosResponse<Response<User>>> =>
    axiosInstance.get(`/api/user/get-user-token/${token}`),

  createUser: async (data: UserRequest): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.post("/api/user/create", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data || "Unknown error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Unknown error",
          data: null,
        };
      }
    }
  },
  updateUser: async (
    id: string,
    data: UserRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put(`/api/user/update/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data || "Unknown error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Unknown error",
          data: null,
        };
      }
    }
  },

  changeUserRoles: (
    id: string,
    newRole: number
  ): Promise<AxiosResponse<Response<User>>> =>
    axiosInstance.put(`/api/user/change-role/${id}`, { newRole }),

  changeUserStatus: async (id: string): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put(`/api/user/change-status/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: error.response?.status || 500,
          message: error.response?.data || "Unknown error",
          data: null,
        };
      } else {
        return {
          statusCode: 500,
          message: "Unknown error",
          data: null,
        };
      }
    }
  },

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
