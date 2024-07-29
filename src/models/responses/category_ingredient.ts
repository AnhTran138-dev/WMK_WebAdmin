import { Status } from "./recipes";

export interface CategoriesIngredient {
  id: string;
  name: string;
  description: string;
  status: Status;
}
