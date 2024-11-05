import { Cart, CartItem } from "@/types";

const cart: Cart = [];

export function getCart() {
  return cart;
}

export function addToCart(item: CartItem) {
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
}

export function removeFromCart(itemId: number) {
  const index = cart.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

export function clearCart() {
  cart.length = 0;
}
