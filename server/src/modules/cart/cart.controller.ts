import { Request, Response } from "express";
import { getCart, addItem, removeItem, clearCart } from "./cart.service";

export function getCartController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const cart = getCart(userId);
  res.json(cart);
}

export function addItemController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const item = req.body;
  const cart = addItem(userId, item);
  res.json(cart);
}

export function removeItemController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const itemId = Number(req.params.itemId);
  const cart = removeItem(userId, itemId);
  res.json(cart);
}

export function clearCartController(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const cart = clearCart(userId);
  res.json(cart);
}
