import { NextResponse } from "next/server";

const cart = []; // Temporart cart memory array

export async function POST(request: Request) {
  try {
    const { id, title, price, quantity } = await request.json();

    // check if product alreadt exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      // update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({ id, title, price, quantity });
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
