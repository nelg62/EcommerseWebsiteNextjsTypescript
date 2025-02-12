// https://tailwindflex.com/@jaxstone/product-page-2

// can also try this one https://tailwindflex.com/@dika99/product-details-page

"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import Image from "next/image";

interface ProductPageProps {
  loading: boolean;
  product: Product;
  error: string | null;
}

const ProductPage: React.FC<ProductPageProps> = ({
  loading,
  product,
  error,
}) => {
  const { addToCart } = useCart();
  if (loading) return <p>Loading product...</p>;

  const handleAddToCart = () => {
    console.log("productpage add to cart", product.id);

    addToCart(product);
  };

  return (
    <>
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && product && (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <Image
                    src={product.thumbnail}
                    alt={`${product.title}`}
                    height={500}
                    width={500}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {product.brand} ({product.category})
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:{" "}
                    </span>
                    <span className="text-gay-600 dark:text-gray-300">
                      ${product.price}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {product.availabilityStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Product Description
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
