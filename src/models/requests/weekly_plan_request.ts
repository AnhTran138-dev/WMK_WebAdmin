export interface WeeklyPlanRequest {
  title: string;
  description: string;
  urlImage: string;
  beginDate: Date;
  endDate: Date;
  recipeIds: RecipeID[];
}

export interface RecipeID {
  recipeId: string;
  quantity: number;
  dayInWeek: number;
  mealInDay: number;
}
