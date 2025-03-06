import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartReviewPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {/* Order Header */}
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Shopping Cart
        </h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {/* Cart Section */}
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        {/* Cart Items */}
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Your Cart
            </p>

            {cart.length === 0 ? (
              <p className="text-gray-600 mt-4">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="mt-6 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full border-b pb-6"
                >
                  <div className="w-full md:w-40">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start w-full">
                    <div className="w-full flex flex-col justify-start items-start space-y-2">
                      <h3 className="text-lg xl:text-xl font-semibold leading-6 text-gray-800 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        SKU: {item.sku}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full md:w-auto space-x-4">
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                        Qty: {item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 underline text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Continue Shopping & Clear Cart */}
          <div className="flex justify-between w-full">
            <Link href="/products">
              <span className="text-indigo-600 text-sm font-semibold cursor-pointer">
                ← Continue Shopping
              </span>
            </Link>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 text-sm font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Summary
          </h3>

          <div className="flex justify-between w-full border-b pb-4">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Subtotal
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              ${calculateSubtotal().toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between w-full border-b pb-4">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Shipping
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              Free
            </p>
          </div>

          <div className="flex justify-between w-full">
            <p className="text-lg dark:text-white font-semibold leading-4 text-gray-800">
              Total
            </p>
            <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
              ${calculateSubtotal().toFixed(2)}
            </p>
          </div>

          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartReviewPage;
