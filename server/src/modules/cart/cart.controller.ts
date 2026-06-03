import { Request, Response } from "express";
import { getCart, addItem, removeItem, clearCart } from "./cart.service";
import { AppError, ErrorCode } from "../../core/errors";

export async function getCartController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  // 只能访问自己的购物车
  if (req.userId !== userId) {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const cart = await getCart(userId);
  res.json(cart);
}

export async function addItemController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  // 只能操作自己的购物车
  if (req.userId !== userId) {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const { productId, quantity } = req.body;
  const cart = await addItem(userId, productId, quantity);
  res.json(cart);
}

export async function removeItemController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  // 只能操作自己的购物车
  if (req.userId !== userId) {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const productId = Number(req.params.productId);
  const cart = await removeItem(userId, productId);
  res.json(cart);
}

export async function clearCartController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  // 只能操作自己的购物车
  if (req.userId !== userId) {
    throw new AppError("Forbidden", 403, ErrorCode.UNAUTHORIZED);
  }
  const cart = await clearCart(userId);
  res.json(cart);
}
