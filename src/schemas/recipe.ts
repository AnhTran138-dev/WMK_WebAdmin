import { z } from "zod";

export const stepSchema = z.object({
  index: z.number(),
  name: z.string(),
  mediaURL: z.string(),
  imageLink: z.string(),
  description: z.string(),
});

export const ingredentsSchema = z.object({
  ingredientId: z.string().uuid(),
  amount: z.number(),
});

export const recipeSchema = z.object({
  name: z.string(),
  servingSize: z.number(),
  cookingTime: z.number(),
  difficulty: z.number().min(0).max(2),
  description: z.string(),
  img: z.string(),
  steps: z.array(stepSchema),
  categoryIds: z.array(z.string().uuid()),
  recipeIngredientsList: z
    .array(ingredentsSchema)
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});
