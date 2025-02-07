//  if the one i am using for cart is not good i can use this https://tailwindflex.com/@code-huit/order-sumamary

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartReviewPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  console.log("cart", cart);

  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
                >
                  <div className="md:w-4/12 2xl:w-1/4 w-full">
                    <Image
                      src={item.thumbnail}
                      alt={`${item.title}`}
                      width={500}
                      height={500}
                      className="h-full object-center object-cover md:block hidden"
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      {item.sku}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-black leading-none text-gray-800">
                        {item.title}
                      </p>
                      <select
                        aria-label="Select quantity"
                        className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                      >
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                      </select>
                    </div>
                    {/* <p className="text-xs leading-3 text-gray-600 pt-2">
                      Height: {item.dimensions.height}
                    </p> */}
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to Favorites
                        </p>
                        <p
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                        >
                          Remove
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                href="/products"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cart.length}
            </span>
            <span className="font-semibold text-sm">$</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping</option>
            </select>
          </div>
          <div className="py-10">
            <label className="font-semibold inline-block mb-3 text-sm uppercase">
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span></span>
              <span></span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReviewPage;
