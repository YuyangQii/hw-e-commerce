import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

// 定义 users 表结构，字段来自 DummyJSON /users API 的返回数据
export const users = pgTable("users", {
  id: serial("id").primaryKey(),                               // Primary Key
  username: varchar("username", { length: 100 }).notNull().unique(), 
  email: varchar("email", { length: 255 }).notNull().unique(), 
  password: varchar("password", { length: 255 }).notNull(),    // 存 bcrypt 加密后的密码
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"), 
  phone: varchar("phone", { length: 50 }),                       
  image: text("image"),                                         
});

// $inferSelect：从数据库查询时返回的类型（id 是 number）
// $inferInsert：写入数据库时的类型（id 是可选的，因为自增）
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
