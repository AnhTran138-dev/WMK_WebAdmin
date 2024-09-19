export interface OrderDetailDialog {
  id: string;
  orderCode: number;
  userId: string;
  orderGroupId: null;
  receiveName: string;
  receivePhone: string;
  note: string;
  address: string;
  longitude: number;
  latitude: number;
  img: string;
  shipDate: Date;
  orderDate: Date;
  totalPrice: number;
  status: string;
  weeklyPlan: null;
  transaction: Transaction;
  orderDetails: OrderDetailElement[];
  feedBacks: Feedback;
}

export interface Feedback {
  id: string;
  orderId: string;
  rating: number;
  description: string;
  createdAt: Date;
  createdBy: string;
}

export interface OrderDetailElement {
  id: string;
  orderId: string;
  recipeId: string;
  standardWeeklyPlanId: string;
  dayInWeek: number;
  mealInDay: number;
  quantity: number;
  price: number;
  recipe: Recipe;
  recipeIngredientOrderDetails: RecipeIngredientOrderDetail[];
}

interface Recipe {
  id: string;
  name: string;
  servingSize: number;
  cookingTime: number;
  difficulty: string;
  description: string;
  notice: null;
  img: string;
  price: number;
  popularity: number;
  processStatus: string;
  baseStatus: string;
  createdAt: Date;
  createdBy: string;
  approvedAt: Date;
  approvedBy: string;
  updatedAt: Date;
  updatedBy: string;
  // recipeIngredients: any[];
  // recipeCategories: any[];
  // recipeNutrient: null;
  // recipeSteps: any[];
}

interface RecipeIngredientOrderDetail {
  id: string;
  orderDetailId: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  ingredientPrice: number;
  ingredient: Ingredient;
}

interface Ingredient {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  ingredientNutrient: null;
  ingredientCategory: null;
}

export interface Transaction {
  id: string;
  orderId: string;
  type: string;
  amount: number;
  transactionDate: Date;
  notice: null;
  extraData: null;
  signature: null;
  status: string;
}
