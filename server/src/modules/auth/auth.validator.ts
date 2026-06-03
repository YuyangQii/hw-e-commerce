import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;
