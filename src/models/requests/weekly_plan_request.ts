export interface WeeklyPlanRequest {
  title: string;
  description: string;
  weeklyPlanId: string;
  createdBy: string;
  urlImage: string;
  processStatus: number;
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
