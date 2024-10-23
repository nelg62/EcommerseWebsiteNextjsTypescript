// https://tailwindflex.com/@jaxstone/tailwind-product-gallery
// https://tailwindflex.com/@noob_dev/products-card-grid
// https://tailwindflex.com/@oliver-hansen/product-card-5

// https://tailwindflex.com/@jaxstone/product-page-2
// https://tailwindflex.com/@omkar007/product-card-6
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
      <div onClick={handleCardClick} className="cursor-pointer">
        <Image
          src={product.thumbnail}
          alt={`${product.title}`}
          width={100}
          height={100}
          priority
          className="object-cover h-64 w-full"
        />
      </div>
      <div className="flex flex-col gap-1 mt-4 px-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
          {product.title}
        </h2>
        <span className="font-normal text-gray-600 dark:text-gray-300">
          {product.brand} ({product.category})
        </span>
        <span className="font-semibold text-gray-800 dark:text-gray-50">
          ${product.price}
        </span>
      </div>

      <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
        <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
          <span className="text-base">Add to Cart</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
