import { ilike, eq, and, SQL } from "drizzle-orm";
import { db } from "../../db";
import { products } from "./product.schema";

// Repository 层：所有和数据库直接交互的逻辑都在这里
// Service 层调用这里的函数，不直接碰 Drizzle

export async function findAllProducts(
  page: number,
  limit: number,
  category: string,
  search: string
) {
  // 动态构建过滤条件
  const filters: SQL[] = [];

  if (category) {
    // category 完全匹配
    filters.push(eq(products.category, category));
  }

  if (search) {
    // title 模糊搜索，ilike 是大小写不敏感的 LIKE
    filters.push(ilike(products.title, `%${search}%`));
  }

  // 先查总数（用于分页信息）
  const allMatching = await db
    .select()
    .from(products)
    .where(filters.length > 0 ? and(...filters) : undefined);

  const total = allMatching.length;

  // 再查当前页的数据，用 limit + offset 分页
  const offset = (page - 1) * limit;
  const result = await db
    .select()
    .from(products)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .limit(limit)
    .offset(offset);

  return { products: result, total, page, limit };
}

export async function findProductById(id: number) {
  // eq(products.id, id) 等价于 WHERE id = ?
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id));

  // select 返回数组，取第一个；不存在则返回 undefined
  return result[0];
}
