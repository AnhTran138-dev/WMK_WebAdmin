import { z } from "zod";

const RecipeIDSchema = z.object({
  recipeId: z.string().optional(),
  quantity: z.number().optional(),
  dayInWeek: z.number().int().min(1).max(8).optional(),
  mealInDay: z.number().int().min(1).max(3).optional(),
});

const WeeklyPlanRequestSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  urlImage: z.string().url(),
  beginDate: z.date(),
  endDate: z.date(),
  recipeIds: z.array(RecipeIDSchema),
});

export { WeeklyPlanRequestSchema, RecipeIDSchema };
