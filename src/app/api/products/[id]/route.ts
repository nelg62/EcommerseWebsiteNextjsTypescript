import { NextResponse } from "next/server";
import { ProductApi } from "../../api";

// const ProductApi = "https://dummyjson.com/products";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await fetch(`${ProductApi}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the product");
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}`, error);
    return NextResponse.json(
      { error: `Failed to fetch product with id ${id}` },
      { status: 500 }
    );
  }
}
