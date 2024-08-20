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

export enum OrderStatus {
  Processing = 0,
  Confirm = 1,
  Shipping = 2,
  Shipped = 3,
  UnShipped = 4,
  Delivered = 5,
  Refund = 6,
  Canceled = 7,
}
