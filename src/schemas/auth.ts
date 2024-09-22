import { z } from "zod";

export const LoginSchema = z.object({
  emailOrUserName: z.string().min(3).max(255),
  password: z.string(),
});
