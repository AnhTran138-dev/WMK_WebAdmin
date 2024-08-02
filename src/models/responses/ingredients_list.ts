export interface IngredientsList {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  ingredientNutrient: IngredientNutrient;
  ingredientCategory: IngredientCategory;
}

export interface IngredientCategory {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface IngredientNutrient {
  id: string;
  ingredientID: string;
  calories: number;
  fat: number;
  saturatedFat: number;
  sugar: number;
  carbonhydrate: number;
  dietaryFiber: number;
  protein: number;
  sodium: number;
}
