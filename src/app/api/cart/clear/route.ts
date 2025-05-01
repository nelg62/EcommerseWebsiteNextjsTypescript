import { NextResponse } from "next/server";
import { clearCart, getCart } from "../cartStore";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    await clearCart(userId);

    return NextResponse.json({
      message: "Cart cleared",
      cart: getCart(userId),
    });
  } catch (error) {
    console.error("Error clearing the cart", error);
    return NextResponse.json(
      { error: "Failed to clear the cart" },
      { status: 500 }
    );
  }
}
