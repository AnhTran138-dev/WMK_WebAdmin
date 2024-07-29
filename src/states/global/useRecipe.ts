import { createGlobalState } from "../../configs";
import { RecipeList } from "../../models/responses/recipe_list";
import { QueryKey } from "../query_key";

export const useRecipeState = createGlobalState<RecipeList[] | null>(
  QueryKey.RECIPE,
  null
);
