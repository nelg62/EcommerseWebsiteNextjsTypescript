import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    const categoryList = categories
      .map((item) => item.category)
      .filter((c): c is string => Boolean(c));

    return NextResponse.json({ categories: categoryList });
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
