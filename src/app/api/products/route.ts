import { NextResponse } from "next/server";
import { ProductApi } from "../api";

// const ProductApi = "https://dummyjson.com/products";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = 20; // Number of products per page
  const skip = (parseInt(page) - 1) * limit;

  try {
    const response = await fetch(`${ProductApi}?skip=${skip}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    const nextPage =
      data.products.length === limit
        ? `/api/products?page=${parseInt(page) + 1}`
        : null;

    return NextResponse.json({
      products: data.products,
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
