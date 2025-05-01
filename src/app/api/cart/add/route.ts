// src/app/api/cart/add/route.ts
import { NextResponse } from "next/server";
import { addToCart, getCart } from "../cartStore";

export async function POST(request: Request) {
  try {
    const { userId, productId, quantity } = await request.json();
    console.log("productID", productId);

    await addToCart(userId, productId, quantity);
    const cart = await getCart(userId);

    return NextResponse.json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
