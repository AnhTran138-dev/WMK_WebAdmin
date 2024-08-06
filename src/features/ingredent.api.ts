import axios from "axios";
import { axiosInstance } from "../configs";
import { IngredientRequest } from "../models/requests";
import { CategoryRequest } from "../models/requests/category_request";
import { Response } from "../models/responses";

export const IngredientApi = {
  updateIngredient: async (
    id: string,
    data: IngredientRequest
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.put<Response<null>>(
        `/api/ingredients/update/${id}`,
        data
      );
      return response.data;
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

  createIngredeint: async (
    data: IngredientRequest
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const respone = await axiosInstance.post<Response<null>>(
        "/api/ingredients/create-new",
        data
      );
      return respone.data;
    } catch (error) {
      console.error("Failed to create ingredient:", error);
      if (axios.isAxiosError(error)) {
        console.error("Failed to create ingredient:", error.message);
        return {
          data: null,
          message: error.response?.data.message,
          statusCode: error.response?.data.statusCode,
        };
      } else {
        console.error("An unexpected error occurred:", error);
        return {
          data: null,
          message: "An unexpected error occurred.",
          statusCode: 500,
        };
      }
    }
  },

  deleteIngredient: async (id: string): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.delete<Response<null>>(
        `/api/ingredients/delete/${id}`
      );
      return response.data;
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

  changeStatusIngredient: async (
    id: string,
    status: number
  ): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await axiosInstance.put(`/api/ingredients/update-status/${id}`, {
        status,
      });
      return true;
    } catch (error) {
      console.log("Failed to change status ingredient:", error);
      return false;
    }
  },

  category: {
    createCategory: async (data: CategoryRequest): Promise<Response<null>> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const respone = await axiosInstance.post(
          "/api/ingredientcategories/create",
          data
        );
        return respone.data;
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

    changeStatusCategory: async (
      id: string,
      status: number
    ): Promise<boolean> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await axiosInstance.put(
          `/api/ingredientcategories/change-status/${id}`,
          {
            status,
          }
        );
        return true;
      } catch (error) {
        console.log("Failed to change status category:", error);
        return false;
      }
    },

    updateCategory: async (
      id: string,
      data: CategoryRequest
    ): Promise<Response<null>> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await axiosInstance.put<Response<null>>(
          `/api/ingredientcategories/update/${id}`,
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

    deleteCategory: async (id: string): Promise<Response<null>> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await axiosInstance.delete<Response<null>>(
          `/api/ingredientcategories/delete-by-id/${id}`
        );
        return response.data;
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
  },
};
