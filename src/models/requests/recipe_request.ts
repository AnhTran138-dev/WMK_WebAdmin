export interface RecipeRequest {
  id?: string;
  name: string;
  servingSize: number;
  cookingTime: number;
  difficulty: number;
  description: string;
  img: string;
  createdBy: string;
  categoryIds: string[];
  recipeIngredientsList: RecipeIngredientsList[];
  steps: Step[];
}

export interface RecipeIngredientsList {
  ingredientId: string;
  amount: number;
}

export interface Step {
  id?: string;
  index: number;
  name: string;
  mediaURL: string;
  imageLink: string;
  description: string;
}
