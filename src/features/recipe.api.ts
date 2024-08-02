import { axiosInstance } from "../configs";
import { CategoryRequest, RecipeRequest } from "../models/requests";

export const recipeApi = {
  getRecipeList: () => axiosInstance.get("/api/recipes/get-all"),

  createRecipe: (data: RecipeRequest) =>
    axiosInstance.post("/api/recipes/create-new", data),

  updateRecipe: (id: string, ProcessStatus: number, Notice: string) =>
    axiosInstance.put(`/api/recipes/update/${id}/${ProcessStatus}/${Notice}`),

  deleteRecipe: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/api/recipes/delete/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  },

  changeStatusRecipe: async (
    id: string,
    ProcessStatus: number,
    Notice: string
  ): Promise<boolean> => {
    try {
      await axiosInstance.put(
        `/api/recipes/change-status/${id}?ProcessStatus=${ProcessStatus}&Notice=${Notice}`
      );
      return true;
    } catch (error) {
      return false;
    }
  },

  category: {
    getCategoryList: () => axiosInstance.get("/api/categories/get-all"),

    createCategory: (data: CategoryRequest) =>
      axiosInstance.post("/api/categories/create", data),

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

    updateCategory: (id: string, data: CategoryRequest) =>
      axiosInstance.put(`/api/categories/update/${id}`, data),

    deleteCategory: async (id: string): Promise<boolean> => {
      try {
        await axiosInstance.delete(`/api/categories/delete/${id}`);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
