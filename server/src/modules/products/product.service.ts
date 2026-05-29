import { Product } from "./types";
import { AppError, ErrorCode } from "../../core/errors";
import productsData from "../../db/seed/products.json";

const products: Product[] = productsData as Product[];

export function getAllProducts(page: number, limit: number, category: string, search: string) {
  let filtered = products;

  if (category) {
    filtered = filtered.filter(function (p) {
      return p.category === category;
    });
  }

  if (search) {
    filtered = filtered.filter(function (p) {
      return p.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  const total = filtered.length;
  const skip = (page - 1) * limit;
  const result = filtered.slice(skip, skip + limit);

  return { products: result, total: total, page: page, limit: limit };
}

export function getProductById(id: number) {
  const product = products.find(function (p) {
    return p.id === id;
  });

  if (!product) {
    throw new AppError("Product not found", 404, ErrorCode.NOT_FOUND);
  }

  return product;
}
