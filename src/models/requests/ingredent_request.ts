export interface IngredentRequest {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: number;
  updatedAt: Date;
  updatedBy: string;
  updateIngredientNutrientRequest: UpdateIngredientNutrientRequest;
}

export interface UpdateIngredientNutrientRequest {
  calories: number;
  fat: number;
  saturatedFat: number;
  sugar: number;
  carbonhydrate: number;
  dietaryFiber: number;
  protein: number;
  sodium: number;
}


