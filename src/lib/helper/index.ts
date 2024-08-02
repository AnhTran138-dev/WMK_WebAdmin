// import {
//   CategoryRequest,
//   CategoryType,
//   IngredentCategoryType,
//   RecipeCategoryType,
// } from "../../models/requests";

// // Type guards
// export function isRecipeCategory(
//   category: CategoryRequest | null
// ): category is RecipeCategoryType {
//   return category !== null && category.obj === CategoryType.Recipe;
// }

// export function isIngredientCategory(
//   category: CategoryRequest | null
// ): category is IngredentCategoryType {
//   return category !== null && category.obj === CategoryType.Ingredient;
// }

// // Helper function to create a CategoryRequest
// export function createCategoryRequest(
//   type: CategoryType,
//   name: string,
//   description: string,
//   additionalProps?: { id?: string; status?: number; type?: string }
// ): CategoryRequest {
//   if (type === CategoryType.Ingredient) {
//     return {
//       obj: CategoryType.Ingredient,
//       name,
//       description,
//       ...additionalProps,
//     } as IngredentCategoryType;
//   } else {
//     return {
//       obj: CategoryType.Recipe,
//       name,
//       description,
//       type: additionalProps?.type || "",
//     } as RecipeCategoryType;
//   }
// }
