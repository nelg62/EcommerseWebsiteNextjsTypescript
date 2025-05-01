// src/app/api/cart/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";
import { getCart } from "@/app/api/cart/cartStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");

  if (!userIdParam) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const userId = parseInt(userIdParam);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    const items = await getCart(userId); // ✅ uses Prisma
    const formattedCart = items.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
      thumbnail: item.product.thumbnail,
      //   sku: item.product.sku,
      quantity: item.quantity,
    }));

    return NextResponse.json({ cart: formattedCart });
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
