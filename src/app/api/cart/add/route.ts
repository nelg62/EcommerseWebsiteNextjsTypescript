import { Cart, CartItem } from "@/types";
import { NextResponse } from "next/server";

const cart: Cart = []; // Temporary cart memory array

export async function POST(request: Request) {
  try {
    const { id, title, price, thumbnail, quantity } = await request.json();

    // check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      // update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      const newItem: CartItem = { id, title, price, thumbnail, quantity };
      cart.push(newItem);
    }

    return NextResponse.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
