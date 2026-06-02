import { eq } from "drizzle-orm";
import { db } from "../../db";
import { carts, cartItems } from "./cart.schema";
import { products } from "../products/product.schema";

export async function findOrCreateCart(userId: number) {
  const existing = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId));

  if (existing[0]) return existing[0];

  const created = await db
    .insert(carts)
    .values({ userId, total: "0", discountedTotal: "0" })
    .returning();
  return created[0];
}

// 查购物车及其所有商品（JOIN cart_items + products）
export async function getCartWithItems(userId: number) {
  const cart = await findOrCreateCart(userId);

  const items = await db
    .select({
      id: cartItems.id,
      productId: products.id,
      title: products.title,
      price: cartItems.priceAtAdd,
      quantity: cartItems.quantity,
      thumbnail: products.thumbnail,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id));

  return { ...cart, items };
}

// 添加商品：已存在则增加数量，否则新增一行
export async function addItem(cartId: number, productId: number, quantity: number, priceAtAdd: string) {
  const existing = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));

  const found = existing.find((item) => item.productId === productId);

  if (found) {
    await db
      .update(cartItems)
      .set({ quantity: found.quantity + quantity })
      .where(eq(cartItems.id, found.id));
  } else {
    await db.insert(cartItems).values({ cartId, productId, quantity, priceAtAdd });
  }
}

// 更新购物车总价
export async function updateCartTotal(cartId: number) {
  const items = await db
    .select({ price: cartItems.priceAtAdd, quantity: cartItems.quantity })
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));

  const total = items
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  await db.update(carts).set({ total, discountedTotal: total }).where(eq(carts.id, cartId));
}

// 删除购物车中某件商品（按 productId）
export async function removeItem(cartId: number, productId: number) {
  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));

  const target = items.find((item) => item.productId === productId);
  if (target) {
    await db.delete(cartItems).where(eq(cartItems.id, target.id));
  }
}

// 清空购物车所有商品
export async function clearCart(cartId: number) {
  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
  await db.update(carts).set({ total: "0", discountedTotal: "0" }).where(eq(carts.id, cartId));
}
