import { axiosInstance } from "../configs";

export const recipeApi = {
  getRecipeList: () => axiosInstance.get("/api/recipes/get-all"),
};
