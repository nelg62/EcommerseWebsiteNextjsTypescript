"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartIcon() {
  const { cart } = useCart();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative p-2 rounded-full bg-secondary text-foreground hover:bg-accent transition"
    >
      {cart.length > 0 ? (
        <Image src="/fullcart.png" alt="full cart" height={20} width={20} />
      ) : (
        <Image src="/cart.svg" alt="cart" height={20} width={20} />
      )}
      <span className="absolute bg-blue-500 text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">
        {cart.length}
      </span>
    </button>
  );
}
