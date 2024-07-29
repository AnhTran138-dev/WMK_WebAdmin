import { Status } from "./recipe_list";

export interface IngredientsList {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: Status;
  createdAt: Date;
  createdBy: CreatedBy;
  updatedAt: Date;
  updatedBy: UpdatedBy;
  ingredientNutrient: IngredientNutrient;
  ingredientCategory: IngredientCategory;
}

export enum CreatedBy {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
  System = "system",
  The4854880257C247AE9E7EA9904E1C7F24 = " 48548802-57c2-47ae-9e7e-a9904e1c7f24",
}

export interface IngredientCategory {
  id: string;
  name: string;
  description: string;
  status: Status;
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

export enum UpdatedBy {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
  String = "string",
  The4854880257C247AE9E7EA9904E1C7F24 = " 48548802-57c2-47ae-9e7e-a9904e1c7f24",
}
