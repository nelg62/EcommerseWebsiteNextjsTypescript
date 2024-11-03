import { Cart } from "@/types";
import { NextResponse } from "next/server";

// temporary storage to be changed to database
let cart: Cart = [];

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Filter items with specified id
    cart = cart.filter((item) => item.id !== id);

    return NextResponse.json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
