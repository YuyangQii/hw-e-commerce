import { AppError, ErrorCode } from "../../core/errors";
import * as cartRepo from "./cart.repository";
import * as productRepo from "../products/product.repository";

export async function getCart(userId: number) {
  return cartRepo.getCartWithItems(userId);
}

export async function addItem(userId: number, productId: number, quantity: number) {
  const product = await productRepo.findProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404, ErrorCode.NOT_FOUND);
  }

  const cart = await cartRepo.findOrCreateCart(userId);
  await cartRepo.addItem(cart.id, productId, quantity, String(product.price));
  await cartRepo.updateCartTotal(cart.id);

  return cartRepo.getCartWithItems(userId);
}

export async function removeItem(userId: number, productId: number) {
  const cart = await cartRepo.findOrCreateCart(userId);
  await cartRepo.removeItem(cart.id, productId);
  await cartRepo.updateCartTotal(cart.id);

  return cartRepo.getCartWithItems(userId);
}

export async function clearCart(userId: number) {
  const cart = await cartRepo.findOrCreateCart(userId);
  await cartRepo.clearCart(cart.id);

  return cartRepo.getCartWithItems(userId);
}
