import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Your GET request to fetch products from the database
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = 20; // Number of products per page
  const skip = (parseInt(page) - 1) * limit;

  try {
    // Fetch products from the database using Prisma
    const products = await prisma.product.findMany({
      skip,
      take: limit,
    });

    // Check if there are more products for pagination
    const nextPage =
      products.length === limit
        ? `/api/products?page=${parseInt(page) + 1}`
        : null;

    // Return the response with the products and next page link
    return NextResponse.json({
      products,
      next: nextPage,
    });
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
