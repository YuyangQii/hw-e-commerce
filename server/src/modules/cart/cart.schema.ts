import { pgTable, serial, integer, numeric } from "drizzle-orm/pg-core";
import { users } from "../users/user.schema";
import { products } from "../products/product.schema";

// carts 表：每个用户对应一个购物车 one to one 
// 用户删除时级联删除购物车（onDelete: cascade）
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Foreign Key → users.id
  total: numeric("total", { precision: 10, scale: 2 }).notNull().default("0"),
  discountedTotal: numeric("discounted_total", { precision: 10, scale: 2 }).notNull().default("0"), // 折扣后总价
});

// cart_items 表：购物车里的每一件商品
// 购物车删除时级联删除所有商品项（onDelete: cascade）
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade" }),   // foregin key → carts.id
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }), // foregin key → products.id
  quantity: integer("quantity").notNull().default(1),
  priceAtAdd: numeric("price_at_add", { precision: 10, scale: 2 }).notNull(), 
});

// $inferSelect：查询返回的类型
// $inferInsert：插入时的类型（id 可选）
export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
