"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log("products", products);

  return (
    <div>
      <h1>Product Listing</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="h-screen w-full bg-gray-200 dark:bg-gray-800">
        <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
