export interface OrderRequest {
  userId: string;
  standerdWeeklyPlanId: string;
  note: string;
  img: string;
  address: string;
  totalPrice: number;
  longitude: number;
  latitude: number;
  recipeList: RecipeList[];
}

export interface RecipeList {
  recipeId: string;
  dayInWeek: number;
  mealInDay: number;
  quantity: number;
  price: number;
}
export interface UpdateOrderRequest {
  id: string;
  standerdWeeklyPlanId: string;
  note: string;
  address: string;
  shipDate: Date;
  totalPrice: number;
  longitude: number;
  latitude: number;
}
