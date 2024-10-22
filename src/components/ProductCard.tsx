import { Product } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <Image
        src={product.thumbnail}
        alt={`${product.title}`}
        width={100}
        height={100}
        priority
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
