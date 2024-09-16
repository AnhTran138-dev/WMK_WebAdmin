import axios from "axios";
import { axiosInstance } from "../configs";
import { Response } from "../models/responses";

export const OrderApi = {
  getOrderList: () => axiosInstance.get("/api/order/get-all"),

  getOrderById: (Id: string) => axiosInstance.get(`/api/order/get-order/${Id}`),

  // createOrder: (data: OrderRequest) =>
  //   axiosInstance.post("/api/order/create-new", data),

  // updateOrder: (id: string, data: OrderRequest) =>
  //   axiosInstance.put(`/api/order/update/${id}`, data),

  changeOrderStatus: async (
    Id: string,
    Status: number
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.put<Response<null>>(
        `/api/order/change-status/${Id}?status=${Status}`
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

  groupOrder: async (
    isOrder: string,
    groupOrder: string
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.put<Response<null>>(
        `/api/order/change-ordergroup/${isOrder}`,
        groupOrder
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

  deleteOrder: async (Id: string): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.delete<Response<null>>(
        `/api/order/delete/${Id}`
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

  removeInOrder: async (idOrder: string): Promise<Response<null>> => {
    try {
      const response = await axiosInstance.delete<Response<null>>(
        `/api/order/remove-ordergroup/${idOrder}`
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

  changeOrder: async (): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.put<Response<null>>(
        `/api/order/change-order`
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
