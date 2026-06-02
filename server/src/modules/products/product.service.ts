import { AppError, ErrorCode } from "../../core/errors";
import { findAllProducts, findProductById } from "./product.repository";


export async function getAllProducts(
  page: number,
  limit: number,
  category: string,
  search: string
) {
  return await findAllProducts(page, limit, category, search);
}

export async function getProductById(id: number) {
  const product = await findProductById(id);

  if (!product) {
    throw new AppError("Product not found", 404, ErrorCode.NOT_FOUND);
  }

  return product;
}
