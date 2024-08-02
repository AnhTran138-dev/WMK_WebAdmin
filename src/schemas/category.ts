import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.number().optional(),
  type: z.string().optional(),
});
