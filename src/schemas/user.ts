import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => emailRegex.test(val), {
      message: "Email format is invalid",
    }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.number(),
  phone: z
    .string()
    .min(10, "Phone number should be at least 10 characters long")
    .refine((val) => phoneRegex.test(val), {
      message: "Invalid phone number format",
    }),
  address: z.string().min(1, "Address is required"),
  role: z.string(),
});
