export interface WeekplanList {
  id: string;
  beginDate: Date;
  endDate: Date;
  urlImage: string;
  title: string;
  description: string;
  createAt: Date;
  createdBy: string;
  approvedAt: null;
  approvedBy: null;
  updatedAt: null;
  updatedBy: string;
  processStatus: ProcessStatus;
  recipePLans: RecipePLAN[];
}

export enum ProcessStatus {
  Approved = "Approved",
  Denied = "Denied",
  Processing = "Processing",
}

export interface RecipePLAN {
  id: string;
  recipeId: string;
  standardWeeklyPlanId: string;
  dayInWeek: number;
  mealInDay: number;
  quantity: number;
  price: number;
  recipe: Recipe;
}

export interface Recipe {
  id: string;
  name: string;
  servingSize: number;
  cookingTime: number;
  difficulty: number;
  description: string;
  notice: null | string;
  img: string;
  price: number;
  popularity: number;
  processStatus: ProcessStatus;
  baseStatus: number;
  createdAt: Date;
  createdBy: string;
  createName: string;
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
  type?: Type;
  name: string;
  description: string;
  status: Status;
}

export enum Status {
  Available = "Available",
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
  createdBy: AtedBy;
  updatedAt: Date;
  updatedBy: AtedBy;
  ingredientNutrient: Nutrient;
  ingredientCategory: Category;
}

export enum AtedBy {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
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
  Kg = "kg",
  Lít = "lít",
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

export enum MediaURL {
  String = "string",
}
