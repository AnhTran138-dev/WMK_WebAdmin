export interface IngredientRequest {
  id?: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  // status: number;
  // createdBy: string;
  nutrientInfo: NutrientInfo;
}

export interface NutrientInfo {
  calories: number;
  fat: number;
  saturatedFat: number;
  sugar: number;
  carbonhydrate: number;
  dietaryFiber: number;
  protein: number;
  sodium: number;
}
