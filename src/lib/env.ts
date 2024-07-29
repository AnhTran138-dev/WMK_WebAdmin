import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL_BE: z.string(),
});

export const env = envSchema.parse({
  VITE_API_URL_BE: import.meta.env.VITE_API_URL_BE as string,
});
