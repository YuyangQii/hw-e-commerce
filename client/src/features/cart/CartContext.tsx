import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};


type CartContextType = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  function getInitialItems(): CartItem[] {
    const stored = localStorage.getItem("cart");
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  }

  const [items, setItems] = useState<CartItem[]>(getInitialItems());

  useEffect(function () {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addItem(product: CartItem) {
    let found = false;
    const newItems: CartItem[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === product.id) {
        newItems.push({ ...items[i], quantity: items[i].quantity + 1 });
        found = true;
      } else {
        newItems.push(items[i]);
      }
    }

    if (!found) {
      newItems.push({ ...product, quantity: 1 });
    }

    setItems(newItems);
  }

  function removeItem(productId: number) {
    const newItems: CartItem[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id !== productId) {
        newItems.push(items[i]);
      }
    }
    setItems(newItems);
  }

  function clearCart() {
    setItems([]);
  }

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity;
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext 必须在 CartProvider 内部使用");
  }
  return ctx;
}
