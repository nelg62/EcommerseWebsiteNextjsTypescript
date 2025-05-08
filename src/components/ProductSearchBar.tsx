"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext"; // Add this line

type ProductSuggestion = {
  title: string;
};

export default function ProductSearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const { category } = useProduct(); // Use context category instead of URL

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const params = new URLSearchParams();
        params.set("search", query);
        if (category) params.set("category", category);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();

        const productSuggestions: ProductSuggestion[] = data.products.map(
          (product: { title: string }) => ({
            title: product.title,
          })
        );

        setSuggestions(productSuggestions);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    fetchSuggestions();
  }, [query, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", query);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", suggestion);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full rounded shadow z-10">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(s.title)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
