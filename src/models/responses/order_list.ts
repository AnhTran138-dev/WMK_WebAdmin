export interface OrderList {
  id: string;
  orderCode: number;
  userId: string;
  note: string;
  address: string;
  longitude: number;
  latitude: number;
  shipDate: Date;
  orderDate: Date;
  totalPrice: number;
  status: ProcessStatusEnum;
  transactions: Transaction[];
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
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

export interface Recipe {
  id: string;
  name: string;
  servingSize: number;
  cookingTime: number;
  difficulty: number;
  description: string;
  notice: null | string;
  img: string;
  price: number;
  popularity: number;
  processStatus: ProcessStatusEnum;
  baseStatus: number;
  createdAt: Date;
  createdBy: string;
  createName: string;
  approvedAt: Date | null;
  approvedBy: string;
  updatedAt: Date;
  updatedBy: string;
  recipeIngredients: any[];
  recipeCategories: any[];
  recipeNutrient: null;
  recipeSteps: any[];
}

export enum ProcessStatusEnum {
  Approved = "Approved",
  Cancel = "Cancel",
  Customer = "Customer",
  Denied = "Denied",
  Processing = "Processing",
}

export interface RecipeIngredientOrderDetail {
  id: string;
  orderDetailId: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  ingredientPrice: number;
  ingredient: Ingredient;
}

export interface Ingredient {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: Unit;
  price: number;
  packagingMethod: PackagingMethod;
  preservationMethod: string;
  status: IngredientStatus;
  createdAt: Date;
  createdBy: CreatedBy;
  updatedAt: Date;
  updatedBy: UpdatedBy;
  ingredientNutrient: null;
  ingredientCategory: null;
}

export enum CreatedBy {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
  System = "system",
}

export enum PackagingMethod {
  BaoBì = "Bao bì",
  ChaiNhựa = "Chai nhựa",
  ChaiThủyTinh = "Chai thủy tinh",
  GiấyGói = "Giấy gói",
  GóiGiấy = "Gói giấy",
  GóiXaySẵn = "Gói xay sẵn",
  HútChânKhông = "Hút chân không",
  HộpNhựa = "Hộp nhựa",
  KhayXốpDùngMàngBọcThựcPhẩm = "Khay xốp dùng màng bọc thực phẩm",
  ThỏiBọcGiấyNến = "Thỏi bọc giấy nến",
  TúiLưới = "Túi lưới",
  TúiLướiThoángKhí = "Túi lưới thoáng khí",
  TúiNhựaTheoBó = "Túi nhựa theo bó",
  TúiNhựaTheoTừngBó = "Túi nhựa theo từng bó",
  TúiNilon = "Túi nilon",
  ĐóngGóiTheoBó = "Đóng gói theo bó",
}

export enum IngredientStatus {
  Available = "Available",
}

export enum Unit {
  Cái = "cái",
  Cây = "cây",
  Gram = "gram",
  Kg = "kg",
  Lít = "lít",
  Quả = "quả",
}

export enum UpdatedBy {
  Ba21D44E75Ff40398AdaC494C0A90Fc9 = "BA21D44E-75FF-4039-8ADA-C494C0A90FC9",
  String = "string",
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
