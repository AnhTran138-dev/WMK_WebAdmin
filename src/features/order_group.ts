import axios from "axios";
import { axiosInstance } from "../configs";
import { OrderGroupRequest } from "../models/requests";
import { Response } from "../models/responses";

export const OrderGroupApi = {
  createOrderGroup: async (
    data: OrderGroupRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.post<Response<null>>(
        `/api/order-group/create`,
        data
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },

  updateOrderGroup: async (
    id: string,
    data: OrderGroupRequest
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put<Response<null>>(
        `/api/order-group/update/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },

  deleteOrderGroup: async (id: string): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.delete<Response<null>>(
        `/api/order-group/delete/${id}`
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },

  changeStatusOrderGroup: async (
    id: string,
    status: number
  ): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put<Response<null>>(
        `/api/order-group/change-status/${id}`,
        { status }
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },

  clusterOrderGroup: async (radius: number): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.put<Response<null>>(
        `/api/order-group/cluster`,
        { radius }
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          message: error.response?.data.message || error.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },
};
