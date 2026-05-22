import { useMutation } from "@tanstack/react-query";
import { useCartContext } from "../CartContext";
import type { CartItem } from "../CartContext";

export function useCart() {
  const { items, total } = useCartContext();
  return { items, total };
}

export function useAddCartItem() {
  const { addItem } = useCartContext();
  return useMutation({
    mutationFn: async function (product: CartItem) {
      addItem(product);
    },
  })
}


export function useRemoveCartItem() {
  const { removeItem } = useCartContext();
  return useMutation({
    mutationFn: async function (productId: number) {
      removeItem(productId);
    },
  });
}

export function useClearCart() {
  const { clearCart } = useCartContext();
  return useMutation({
    mutationFn: async function () {
      clearCart();
    },
  });
}
