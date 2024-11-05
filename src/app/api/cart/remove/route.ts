import { NextResponse } from "next/server";
import { removeFromCart, getCart } from "../cartStore";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    removeFromCart(id);

    return NextResponse.json({
      message: "Item removed from cart",
      cart: getCart(),
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
