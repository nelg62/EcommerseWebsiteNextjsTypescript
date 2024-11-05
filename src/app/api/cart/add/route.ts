import { NextResponse } from "next/server";
import { CartItem } from "@/types";
import { addToCart, getCart } from "../cartStore";

export async function POST(request: Request) {
  try {
    const { id, title, price, thumbnail, quantity } = await request.json();
    const newItem: CartItem = { id, title, price, thumbnail, quantity };

    addToCart(newItem);

    return NextResponse.json({
      message: "Item added to cart",
      cart: getCart(),
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
