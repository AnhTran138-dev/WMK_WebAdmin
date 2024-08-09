export interface WeeklyPlanRequest {
  id?: string;
  title: string;
  description: string;
  urlImage: string;
  recipeIds: RecipeID[];
}

export interface RecipeID {
  recipeId: string;
  quantity: number;
  dayInWeek: number;
  mealInDay: number;
}
