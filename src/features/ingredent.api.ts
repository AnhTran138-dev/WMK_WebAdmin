import { axiosInstance } from "../configs";
import { IngredientRequest } from "../models/requests";
import { CategoryRequest } from "../models/requests/category_request";

export const IngredientApi = {
  updateIngredient: (id: string, data: IngredientRequest) =>
    axiosInstance.put(`/api/ingredients/update/${id}`, data),

  createIngredeint: (data: IngredientRequest) =>
    axiosInstance.post("/api/ingredients/create-new", data),

  deleteIngredient: async (id: string): Promise<boolean> => {
    try {
      axiosInstance.delete(`/api/ingredients/delete/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  },

  changeStatusIngredient: async (
    id: string,
    status: number
  ): Promise<boolean> => {
    try {
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
    createCategory: (data: CategoryRequest) =>
      axiosInstance.post("/api/ingredientcategories/create-new", data),

    changeStatusCategory: async (
      id: string,
      status: number
    ): Promise<boolean> => {
      try {
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

    updateCategory: (id: string, data: CategoryRequest) =>
      axiosInstance.put(`/api/ingredientcategories/update/${id}`, data),

    deleteCategory: async (id: string): Promise<boolean> => {
      try {
        await axiosInstance.delete(
          `/api/ingredientcategories/delete-by-id/${id}`
        );
        return true;
      } catch (error) {
        console.error("Failed to delete category:", error);
        return false;
      }
    },
  },
};
