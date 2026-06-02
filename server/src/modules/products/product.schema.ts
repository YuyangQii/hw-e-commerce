import { pgTable, serial, varchar, numeric, integer } from "drizzle-orm/pg-core";

// 定义 products 表结构，字段来自 DummyJSON /products API 的返回数据
export const products = pgTable("products", {
  id: serial("id").primaryKey(),                                // Auto-increment Primary Key
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), 
  discountPercentage: numeric("discount_percentage", { precision: 5, scale: 2 }).notNull().default("0"),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"), 
  stock: integer("stock").notNull().default(0),
  brand: varchar("brand", { length: 100 }),                     // 部分商品没有 brand，允许 null
  thumbnail: varchar("thumbnail", { length: 500 }),            
});


export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
