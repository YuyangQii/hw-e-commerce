import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().max(50).optional(),
  image: z.string().url().optional(),
  // role 不允许前端传入，由服务端控制
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

// 更新用户时所有字段可选
export const updateUserSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phone: z.string().max(50).optional(),
  image: z.string().url().optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
