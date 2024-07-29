export interface RecipeList {
  id: string;
  name: string; //recipe name
  servingSize: number; //servings
  cookingTime: number;
  difficulty: number;
  description: string;
  notice: null | string;
  img: string;
  price: number; //price per serving
  popularity: number; //number of views
  processStatus: ProcessStatus; //approved
  baseStatus: number;
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

export enum ProcessStatus {
  Approved = "Approved",
}

export interface RecipeCategory {
  id: string;
  categoryId: string;
  recipeId: string;
  category: Category;
}

export interface Category {
  id: string;
  type?: Type;
  name: string;
  description: string;
  status: Status;
}

export enum Status {
  Available = "Available",
  Unavailable = "UnAvailable",
}

export enum Type {
  Classify = "Classify",
  CookingMethod = "Cooking Method",
  MealInDay = "Meal in day",
  Nation = "Nation",
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  ingredient: Ingredient;
}

export interface Ingredient {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: Unit;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: Status;
  createdAt: Date;
  createdBy: MediaURL;
  updatedAt: Date;
  updatedBy: MediaURL;
  ingredientNutrient: Nutrient;
  ingredientCategory: Category;
}

export enum MediaURL {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
  String = "string",
  System = "system",
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

export enum Unit {
  Cái = "cái",
  Cây = "cây",
  Gram = "gram",
  Kg = "kg",
  Lít = "lít",
  Ml = "ml",
  Quả = "quả",
}

export interface RecipeStep {
  id: string;
  recipeId: string;
  index: number;
  name: string;
  mediaURL: MediaURL;
  imageLink: string;
  description: string;
}
