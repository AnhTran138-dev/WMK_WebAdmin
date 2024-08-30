import { IngredientsList } from "./ingredients_list";

export interface RecipeList {
  id: string;
  name: string; //recipe name
  servingSize: number; //servings
  cookingTime: number;
  difficulty: string;
  description: string;
  notice: null | string;
  img: string;
  price: number; //price per serving
  popularity: number; //number of views
  processStatus: string; //approved
  baseStatus: string;
  createdAt: Date; //created date
  createdBy: string; //created by
  approvedAt: Date | null;
  approvedBy: string;
  updatedAt: Date;
  updatedBy: string;
  recipeIngredients: RecipeIngredient[];
  recipeCategories: RecipeCategory[];
  recipeNutrient: Nutrient | null;
  recipeSteps: RecipeStep[];
}

export interface RecipeCategory {
  id: string;
  categoryId: string;
  recipeId: string;
  category: Category;
}

export interface Category {
  id: string;
  type?: string;
  name: string;
  description: string;
  status: string;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  ingredient: IngredientsList;
}

export interface Nutrient {
  id: string;
  ingredientID?: string;
  calories: number;
  fat: number;
  saturatedFat: number;
  sugar: number;
  carbonhydrate: number;
  dietaryFiber: number;
  protein: number;
  sodium: number;
  recipeID?: string;
}

export interface RecipeStep {
  id: string;
  recipeId: string;
  index: number;
  name: string;
  mediaURL: string;
  imageLink: string;
  description: string;
}
