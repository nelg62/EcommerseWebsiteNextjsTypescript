import type { NextApiRequest, NextApiResponse } from "next";
import { ProductApi } from "./api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(ProductApi);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    res.status(200).json(data.products);
  } catch (error) {
    console.error("Failed to fetch products", error);

    res.status(500).json({ error: "Failed to fetch products" });
  }
}
