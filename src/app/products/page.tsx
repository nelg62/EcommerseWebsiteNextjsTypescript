"use client";
import CategoryDropdown from "@/components/CatergoryDropdown";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/productSorting";
import { useProduct } from "@/context/ProductContext";

export default function Products() {
  const { products, loading, error, lastProductRef } = useProduct();

  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      {/* <h1>Product Listing</h1> */}

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="h-screen w-full bg-gray-200 dark:bg-gray-800">
        <div className="flex flex-wrap gap-4">
          <SortDropdown />
          <CategoryDropdown />
        </div>
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
