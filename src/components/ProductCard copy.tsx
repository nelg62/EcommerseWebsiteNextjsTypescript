// https://tailwindflex.com/@jaxstone/tailwind-product-gallery
// https://tailwindflex.com/@noob_dev/products-card-grid
// https://tailwindflex.com/@oliver-hansen/product-card-5

// https://tailwindflex.com/@jaxstone/product-page-2
// https://tailwindflex.com/@omkar007/product-card-6

// mabie change to this as card https://tailwindflex.com/@shariful-islam/modern-e-commerce-product-card-with-tailwindcss
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    console.log("productcard add to cart", product.id);

    addToCart(product);
  };

  return (
    <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
      <div onClick={handleCardClick} className="cursor-pointer">
        <Image
          src={product.thumbnail}
          alt={`${product.title}`}
          width={500}
          height={500}
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
        <button
          onClick={handleAddToCart}
          className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
        >
          <span className="text-base">Add to Cart</span>
          <div className="h-6 w-6">+</div>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
