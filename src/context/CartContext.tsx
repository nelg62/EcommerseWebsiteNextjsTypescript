"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "@/types";

// extends the Product interface to incluse quantity for CartItem
interface CartItem extends Product {
  quantity: number;
}

// define properties and methods in CartContext
interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, userId: number) => void;
  removeFromCart: (productId: number, userId: number) => void;
  clearCart: (userId: number) => void;
}

// create CartContext with undefined as initial value
const CartContext = createContext<CartContextProps | undefined>(undefined);

// CartProvider component to wrap around parts of app that need cart funcionality
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const userId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCart(Array.isArray(data.cart) ? data.cart : []);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  // function to add a product to cart
  const addToCart = async (product: Product, userId: number) => {
    console.log("product", product);

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          userId: userId,
        }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");

      const data = await response.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // function to remove a product from cart by its ID
  const removeFromCart = async (userId: number, productId: number) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error("Failed to remove item from cart");

      const data = await response.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (error) {
      console.error("Error removing form cart", error);
    }
  };

  // function to clear all items from cart
  const clearCart = async (userId: number) => {
    try {
      const response = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error("Failed to clear the cart");

      const data = await response.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  // provide cart state and methods to components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook to use the CartContext in components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
