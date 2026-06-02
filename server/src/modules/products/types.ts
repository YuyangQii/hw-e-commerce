// 直接从 schema 导出推导类型，不再手动维护
// Product    = 从数据库查出来的完整商品对象
// NewProduct = 插入数据库时的类型（id 可选，因为自增）
export type { Product, NewProduct } from "./product.schema";
