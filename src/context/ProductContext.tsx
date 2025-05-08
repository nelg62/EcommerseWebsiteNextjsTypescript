"use client";
import { Product } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

interface ProductContextProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchMoreProducts: () => void;
  lastProductRef: (node: HTMLDivElement | null) => void;
  setSortOption: React.Dispatch<
    React.SetStateAction<
      "price-asc" | "price-desc" | "title-asc" | "title-desc"
    >
  >;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]); // state to store the list of products
  const [loading, setLoading] = useState<boolean>(false); // state for loading
  const [error, setError] = useState<string | null>(null); // state for error
  const [nextUrl, setNextUrl] = useState<string | null>("/api/products?page=1"); // state to store URL for next page of products
  const [fetchedPages, setFetchedPages] = useState(new Set<string>()); // track fetched pages
  const [sortOption, setSortOption] = useState<
    "price-asc" | "price-desc" | "title-asc" | "title-desc"
  >("title-asc");
  const [category, setCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const observer = useRef<IntersectionObserver | null>(null); // ref to store IntersectionObserver instance to check when scrolling screen

  useEffect(() => {
    setProducts([]);
    setFetchedPages(new Set());

    const firstPageUrl = `/api/products?page=1&sort=${sortOption}${
      category ? `&category=${encodeURIComponent(category)}` : ""
    }${search ? `&search=${encodeURIComponent(search)}` : ""}`;
    setNextUrl(firstPageUrl);

    const fetchInitial = async () => {
      try {
        const response = await fetch(firstPageUrl);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products);
        setNextUrl(data.next);
        setFetchedPages(new Set([firstPageUrl]));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      }
    };

    fetchInitial();
  }, [sortOption, category]);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/products?page=1&sort=${sortOption}${
          category ? `&category=${category}` : ""
        }${search ? `&search=${search}` : ""}`
      );
      const data = await response.json();
      setProducts(data.products);
      setNextUrl(data.next);
    };

    fetchData();
  }, [sortOption, category, search]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchMoreProducts,
        lastProductRef,
        setSortOption,
        setCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within the Product Provider");
  }
  return context;
};
