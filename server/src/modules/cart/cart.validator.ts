import { z } from "zod";

// 添加购物车商品：前端只需传 productId 和 quantity
// cartId 由服务端根据登录用户自动确定
export const addCartItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1),
});
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;

// 更新购物车商品数量
export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1),
});
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
