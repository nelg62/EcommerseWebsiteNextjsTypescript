import { NextResponse } from "next/server";
import { ProductApi } from "../api";

// const ProductApi = "https://dummyjson.com/products";

export async function GET() {
  try {
    const response = await fetch(ProductApi);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return NextResponse.json(data.products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
