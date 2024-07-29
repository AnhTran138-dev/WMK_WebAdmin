import { z } from "zod";

export const LoginSchema = z.object({
  emailOrUserName: z.string(),
  password: z.string(),
});
