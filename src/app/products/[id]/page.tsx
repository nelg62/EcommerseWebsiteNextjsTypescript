"use client";
import ProductPage from "@/components/ProductPage";
import ReviewCard from "@/components/ReviewCard";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProductById = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
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

    fetchProductById();
  }, [id]);

  return (
    <div>
      <h1>Product Details</h1>

      <ProductPage loading={loading} product={product} error={error} />
      <ReviewCard loading={loading} product={product} error={error} />
    </div>
  );
}
