import axios from "axios";
import { axiosInstance } from "../configs";
import { CategoryRequest, RecipeRequest } from "../models/requests";
import { Response } from "../models/responses";

export const recipeApi = {
  getRecipeList: () => axiosInstance.get("/api/recipes/get-all"),

  createRecipe: async (data: RecipeRequest): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const respone = await axiosInstance.post<Response<null>>(
        "/api/recipes/create-new",
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

  updateRecipe: async (
    id: string,
    data: RecipeRequest
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const respone = await axiosInstance.put<Response<null>>(
        `/api/recipes/update/${id}`,
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

  deleteRecipe: async (id: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axiosInstance.delete(`/api/recipes/delete/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  },

  changeBaseStatusRecipe: async (
    id: string,
    baseStatus: number
  ): Promise<Response<null>> => {
    try {
      const respone = await axiosInstance.put(
        `/api/recipes/change-base-status/${id}`,
        { baseStatus }
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

  changeStatusRecipe: async (
    id: string,
    processStatus: number,
    notice: string
  ): Promise<Response<null>> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const respone = await axiosInstance.put<Response<null>>(
        `/api/recipes/change-status/${id}`,
        {
          processStatus,
          notice,
        }
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

  category: {
    getCategoryList: async () =>
      await axiosInstance.get("/api/categories/get-all"),

    createCategory: async (data: CategoryRequest): Promise<Response<null>> => {
      try {
        const respone = await axiosInstance.post(
          "/api/categories/create",
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

    changeCategoryStatus: async (
      id: string,
      status: number
    ): Promise<boolean> => {
      try {
        await axiosInstance.put(`/api/categories/change-status/${id}`, {
          status,
        });
        return true;
      } catch (error) {
        return false;
      }
    },

    updateCategory: async (
      id: string,
      data: CategoryRequest
    ): Promise<Response<null>> => {
      try {
        const respone = await axiosInstance.put<Response<null>>(
          `/api/categories/update/${id}`,
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

    deleteCategory: async (id: string): Promise<Response<null>> => {
      try {
        const response = await axiosInstance.delete(
          `/api/categories/delete/${id}`
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
