export async function getCart(userId: number) {
    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
    const data = await res.json();
    return data;
}

export async function addItemToCart(userId: number, productId: number) {
    const res = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, products: [{ id: productId, quantity: 1 }] }),
    });
    const data = await res.json();
    return data;
}

export async function removeCartItem(cartId: number, remainingProductIds: number[]) {
    const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            products: remainingProductIds.map((id) => ({ id, quantity: 1 })),
        }),
    });
    const data = await res.json();
    return data;
}

export async function clearCart(cartId: number) {
    const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
}
