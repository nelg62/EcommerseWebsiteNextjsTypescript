"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "@/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>("/api/products?page=1"); // Start with the first page

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          fetchMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextUrl]
  );

  useEffect(() => {
    fetchMoreProducts(); // Fetch initial products
  }, []);

  const fetchMoreProducts = async () => {
    if (!nextUrl) return;

    setLoading(true);
    try {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setProducts((prev) => [...prev, ...data.products]);
      setNextUrl(data.next); // Update next page URL
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <h1>Product Listing</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="h-screen w-full bg-gray-200 dark:bg-gray-800">
        <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-gray-200 dark:bg-gray-800">
          {products.map((product, index) => {
            if (index === products.length - 1) {
              // Set the ref for the last product to trigger the infinite scroll
              return (
                <div ref={lastProductRef} key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            }

            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
