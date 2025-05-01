import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// Your GET request to fetch products from the database
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const sort = url.searchParams.get("sort") || "title-asc";
  const category = url.searchParams.get("category")?.toLowerCase();

  const limit = 20; // Number of products per page
  const skip = (parseInt(page) - 1) * limit;

  // Determine sort field and direction
  let orderBy: Prisma.ProductOrderByWithRelationInput = { title: "asc" };
  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "title-desc":
      orderBy = { title: "desc" };
      break;
    case "title-asc":
    default:
      orderBy = { title: "asc" };
      break;
  }

  const whereClause = category
    ? {
        category: {
          equals: category,
        },
      }
    : undefined;

  try {
    // Fetch products from the database using Prisma
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy,
      where: whereClause,
    });

    // Check if there are more products for pagination
    const nextPage =
      products.length === limit
        ? `/api/products?page=${parseInt(page) + 1}&sort=${sort}${
            category ? `&category=${category}` : ""
          }`
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
