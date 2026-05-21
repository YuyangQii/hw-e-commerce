import { ProductResponse } from "../type";

export const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data as ProductResponse;
}

export const fetchProductById = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data as Product;
};

export const fetchCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();
  return data as string[];
};