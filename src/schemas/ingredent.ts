import { z } from "zod";

const nutrientInfoSchema = z.object({
  calories: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  saturatedFat: z.number().nonnegative(),
  sugar: z.number().nonnegative(),
  carbonhydrate: z.number().nonnegative(),
  dietaryFiber: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  sodium: z.number().nonnegative(),
});

const ingredientSchema = z.object({
  ingredientCategoryId: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  img: z.string().url(),
  unit: z.string().min(1, "Unit is required"),
  price: z.number().nonnegative().min(100, "Price is required"),
  packagingMethod: z.string().min(1, "Packaging method is required"),
  preservationMethod: z.string().min(1, "Preservation method is required"),
  status: z.number().int().nonnegative().min(0).max(1),
  createdBy: z.string().min(1, "Created by is required"),
  nutrientInfo: nutrientInfoSchema,
});

export { ingredientSchema, nutrientInfoSchema };
