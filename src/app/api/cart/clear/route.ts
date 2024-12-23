import { NextResponse } from "next/server";
import { clearCart, getCart } from "../cartStore";

export async function POST() {
  try {
    clearCart();

    return NextResponse.json({ message: "Cart cleared", cart: getCart() });
  } catch (error) {
    console.error("Error clearing the cart", error);
    return NextResponse.json(
      { error: "Failed to clear the cart" },
      { status: 500 }
    );
  }
}
