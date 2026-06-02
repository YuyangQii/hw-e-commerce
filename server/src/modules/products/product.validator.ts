import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  category: z.string().min(1).max(100),
  price: z.number().positive(),
  discountPercentage: z.number().min(0).max(100).optional(),
  rating: z.number().min(0).max(5).optional(),
  stock: z.number().int().min(0).optional(),
  brand: z.string().max(100).optional(),
  thumbnail: z.string().url().optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;


export const updateProductSchema = createProductSchema.partial();
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
