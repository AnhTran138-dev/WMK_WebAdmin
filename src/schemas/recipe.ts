import { z } from "zod";

export const stepSchema = z.object({
  index: z.number(),
  name: z.string(),
  mediaURL: z.string(),
  imageLink: z.union([
    z.string().url(),
    z.custom<File>((file) => file instanceof File, {
      message: "Image must be a file",
    }),
  ]),
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
  img: z.union([
    z.string().url(),
    z.custom<File>((file) => file instanceof File, {
      message: "Image must be a file",
    }),
  ]),
  steps: z.array(stepSchema),
  categoryIds: z.array(z.string().uuid()),
  recipeIngredientsList: z
    .array(ingredentsSchema)
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});
