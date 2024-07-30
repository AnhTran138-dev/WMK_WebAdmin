import { axiosInstance } from "../configs";
import { CategoryRequest } from "../models/requests/category_request";
import { IngredentRequest } from "../models/requests/ingredent_request";

export const IngredientApi = {
  updateIngredient: (id: string, data: IngredentRequest) =>
    axiosInstance.put(`/api/ingredients/update/${id}`, data),

  createIngredeint: (data: IngredentRequest) =>
    axiosInstance.post("/api/ingredients/create-new", data),

  deleteIngredient: (id: string) =>
    axiosInstance.delete(`/api/ingredients/delete/${id}`),

  category: {
    createCategory: (data: CategoryRequest) =>
      axiosInstance.post("/api/ingredientcategories/create-new", data),

    updateCategory: (id: string, data: CategoryRequest) =>
      axiosInstance.put(`/api/ingredientcategories/update/${id}`, data),

    deleteCategory: (id: string) =>
      axiosInstance.delete(`/api/ingredientcategories/delete/${id}`),
  },
};
