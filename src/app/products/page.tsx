"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "@/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]); // state to store the list of products
  const [loading, setLoading] = useState<boolean>(false); // state for loading
  const [error, setError] = useState<string | null>(null); // state for error
  const [nextUrl, setNextUrl] = useState<string | null>("/api/products?page=1"); // state to store URL for next page of products
  const [fetchedPages, setFetchedPages] = useState(new Set<string>()); // track fetched pages

  const observer = useRef<IntersectionObserver | null>(null); // ref to store IntersectionObserver instance to check when scrolling screen

  // callback to check the last product element for infinite scrolling
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return; // if already loading do not observe
      if (observer.current) observer.current.disconnect(); // disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        // iff the last product is in view on the screen and there is a nextURL in state, fetch more products
        if (entries[0].isIntersecting && nextUrl) {
          fetchMoreProducts();
        }
      });

      if (node) observer.current.observe(node); // Observe the new node
    },
    [loading, nextUrl]
  );

  // Fetch initial products when components mount
  useEffect(() => {
    fetchMoreProducts();
  }, []);

  // Function to fetch more products from API
  const fetchMoreProducts = async () => {
    if (!nextUrl || fetchedPages.has(nextUrl)) return; // Avoid duplicate fetching

    setLoading(true); // set loading to true befor fetching
    try {
      const response = await fetch(nextUrl); // Fetch the next page of products
      if (!response.ok) {
        throw new Error("Failed to fetch products"); // throw and error if the response is not ok
      }
      const data = await response.json(); // Parse JSON response

      setProducts((prev) => {
        const existingIds = new Set(prev.map((product) => product.id));
        const newProducts = data.products.filter(
          (product: { id: number }) => !existingIds.has(product.id)
        );
        return [...prev, ...newProducts];
      });

      setNextUrl(data.next); // Update next page URL
      setFetchedPages((prev) => new Set(prev).add(nextUrl)); // Mark page as fetched
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // set the srror message
      } else {
        setError("An unknown error occurred"); // set a generic error message
      }
    } finally {
      setLoading(false); // set loading to false after fetching
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
