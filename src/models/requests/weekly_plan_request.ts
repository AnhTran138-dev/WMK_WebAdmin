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

export interface UpdateWeeklyPlan {
  beginDate: Date;
  endDate: Date;
  description: string;
  updatedBy: string;
  recipeIds: string[];
}

export interface UpdateWeeklyPlanFull {
  beginDate: Date;
  endDate: Date;
  urlImage: string;
  title: string;
  description: string;
  notice: string;
  approvedAt: Date;
  approvedBy: string;
  updatedAt: Date;
  updatedBy: string;
  processStatus: number;
  recipeIds: RecipeID[];
}

export interface RecipeID {
  recipeId: string;
  quantity: number;
  dayInWeek: number;
  mealInDay: number;
}
