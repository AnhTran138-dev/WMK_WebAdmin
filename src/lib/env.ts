import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL_BE: z.string(),
  VITE_API_KEY_GOOGLE_MAPS: z.string(),
});

export const env = envSchema.parse({
  VITE_API_URL_BE: import.meta.env.VITE_API_URL_BE as string,
  VITE_API_KEY_GOOGLE_MAPS: import.meta.env.VITE_API_KEY_GOOGLE_MAPS as string,
});
