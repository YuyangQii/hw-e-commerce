import { Request, Response } from "express";
import { getAllProducts as getAllProductsService, getProductById as getProductByIdService } from "./product.service";

export function getAllProducts(req: Request, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10;
  const category = String(req.query.category || "");
  const search = String(req.query.search || "");

  const result = getAllProductsService(page, limit, category, search);
  res.json(result);
}

export function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = getProductByIdService(id);
  res.json(product);
}
