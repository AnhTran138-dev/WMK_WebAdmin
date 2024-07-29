import { Type } from "./recipe_list";
import { Status } from "./recipes";

export interface CategoriesRecipe {
  id: string;
  type: Type;
  name: string;
  description: string;
  status: Status;
}
