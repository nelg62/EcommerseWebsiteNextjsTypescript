// https://tailwindflex.com/@jaxstone/tailwind-product-gallery
// https://tailwindflex.com/@noob_dev/products-card-grid
// https://tailwindflex.com/@oliver-hansen/product-card-5

// https://tailwindflex.com/@jaxstone/product-page-2
// https://tailwindflex.com/@omkar007/product-card-6

// mabie change to this as card https://tailwindflex.com/@shariful-islam/modern-e-commerce-product-card-with-tailwindcss

// https://tailwindflex.com/@shariful-islam/gradient-flip-text-button-with-hover-animation

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// define props for the ProductCard component
interface ProductCardProps {
  product: Product;
}

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter(); // initialize router
  const { addToCart } = useCart(); // Get addToCart function from CartContext

  const [isLiked, setIsLiked] = useState(false); // state to handle like functionality

  // function to handle card click and navigation to product details page
  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  // function to handle adding product to cart
  const handleAddToCart = () => {
    console.log("productcard add to cart", product.id);

    addToCart(product, 1);
  };

  // function to toggle like state
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-80 border border-blue-200 rounded-lg shadow-md p-4">
        {/* <!-- Discount Badge --> */}
        <div className="relative">
          <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -20%
          </span>
          {/* <!-- Wishlist Icon --> */}
          <button
            onClick={toggleHeart}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-all duration-300 hover:bg-red-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                isLiked ? "text-red-500" : "text-gray-600"
              } transition-colors duration-300`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>

          {/* <!-- Product Image --> */}
          <div onClick={handleCardClick} className="cursor-pointer">
            <Image
              src={product.thumbnail}
              alt={`${product.title}`}
              width={500}
              height={500}
              priority
              className="object-contain w-full h-[270px] fill"
            />
          </div>
          {/* <!-- Quick Actions --> */}
          {/* <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
            <button className="bg-white px-3 py-1 text-sm text-gray-700 rounded-full shadow">
              Quick View
            </button>
            <button className="bg-white px-3 py-1 text-sm text-gray-700 rounded-full shadow">
              Quick Order
            </button>
          </div> */}
        </div>

        {/* <!-- Product Details --> */}
        <div className="mt-4">
          <h3 className="text-gray-800 dark:text-gray-50 font-medium text-base">
            {product.title}
          </h3>
          <p className="uppercase text-green-600 text-xs font-medium">
            {product.brand} ({product.category})
          </p>
          {/* <!-- Ratings --> */}
          <div className="flex space-x-1 text-orange-500 text-sm mt-1">
            {[...Array(5)].map((_, starIndex) => (
              <svg
                key={starIndex}
                className={`w-4 h-4 fill-current ${
                  starIndex < product.rating
                    ? "text-yellow-600"
                    : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          {/* <div className="flex space-x-1 text-orange-500 text-sm mt-1">
          
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
          </div> */}
          {/* <!-- Pricing --> */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-blue-600 text-xl font-semibold">
                ${product.price}
              </span>
              {/* <span className="text-gray-400 text-sm line-through">
                $1500.00
              </span> */}
            </div>
            <button
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow text-white overflow-hidden relative transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 group"
              onClick={handleAddToCart}
            >
              {/* Default icon */}
              <span className="group-hover:translate-y-[-30px] transition-all duration-300 group-hover:invisible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </span>

              {/* Hover icon */}
              <span className="absolute group-hover:translate-y-0 translate-y-[30px] transition-all duration-300 invisible group-hover:visible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    // <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
    //   <div onClick={handleCardClick} className="cursor-pointer">
    //     <Image
    //       src={product.thumbnail}
    //       alt={`${product.title}`}
    //       width={500}
    //       height={500}
    //       priority
    //       className="object-cover h-64 w-full"
    //     />
    //   </div>
    //   <div className="flex flex-col gap-1 mt-4 px-4">
    //     <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
    //       {product.title}
    //     </h2>
    //     <span className="font-normal text-gray-600 dark:text-gray-300">
    //       {product.brand} ({product.category})
    //     </span>
    //     <span className="font-semibold text-gray-800 dark:text-gray-50">
    //       ${product.price}
    //     </span>
    //   </div>

    //   <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
    //     <button
    //       onClick={handleAddToCart}
    //       className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
    //     >
    //       <span className="text-base">Add to Cart</span>
    //       <div className="h-6 w-6">+</div>
    //     </button>
    //   </div>
    // </article>
  );
};

export default ProductCard;
