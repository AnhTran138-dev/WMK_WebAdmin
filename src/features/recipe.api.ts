import { axiosInstance } from "../configs";
import { CategoryRequest, RecipeRequest } from "../models/requests";

export const recipeApi = {
  getRecipeList: () => axiosInstance.get("/api/recipes/get-all"),

  createRecipe: (data: RecipeRequest) =>
    axiosInstance.post("/api/recipes/create-new", data),

  updateRecipe: (id: string, ProcessStatus: number, Notice: string) =>
    axiosInstance.put(`/api/recipes/update/${id}/${ProcessStatus}/${Notice}`),

  deleteRecipe: (id: string) =>
    axiosInstance.delete(`/api/recipes/delete/${id}`),

  category: {
    getCategoryList: () => axiosInstance.get("/api/categories/get-all"),

    createCategory: (data: CategoryRequest) =>
      axiosInstance.post("/api/categories/create-new", data),

    updateCategory: (id: string, data: CategoryRequest) =>
      axiosInstance.put(`/api/categories/update/${id}`, data),

    deleteCategory: (id: string) =>
      axiosInstance.delete(`/api/categories/delete/${id}`),
  },
};
