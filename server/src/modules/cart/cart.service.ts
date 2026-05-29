import { Cart, CartItem } from "./types";
import { AppError } from "../../core/errors";
import { ErrorCode } from "../../core/errors";

const carts: { [userId: number]: Cart } = {};

function calculateTotal(items: CartItem[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity;
  }
  return total;
}

export function getCart(userId: number) {
  if (!carts[userId]) {
    carts[userId] = { userId: userId, items: [], total: 0 };
  }
  return carts[userId];
}

export function addItem(userId: number, newItem: CartItem) {
  const cart = getCart(userId);

  let found = false;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === newItem.id) {
      cart.items[i].quantity = cart.items[i].quantity + newItem.quantity;
      found = true;
    }
  }

  if (!found) {
    cart.items.push(newItem);
  }

  cart.total = calculateTotal(cart.items);
  return cart;
}

export function removeItem(userId: number, itemId: number) {
  const cart = getCart(userId);
  const newItems: CartItem[] = [];

  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id !== itemId) {
      newItems.push(cart.items[i]);
    }
  }

  cart.items = newItems;
  cart.total = calculateTotal(cart.items);
  return cart;
}

export function clearCart(userId: number) {
  const cart = getCart(userId);
  cart.items = [];
  cart.total = 0;
  return cart;
}
