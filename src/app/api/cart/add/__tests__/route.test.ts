import { NextResponse } from "next/server";
import { POST } from "../route";
import { addToCart, getCart } from "../../cartStore";
import { CartItem } from "@/types";

// Mock the functions in cartStore
jest.mock("../cartStore", () => ({
  addToCart: jest.fn(),
  getCart: jest.fn(),
}));

describe("POST /api/cart/add", () => {
  const mockCart: CartItem[] = [
    {
      id: 1,
      title: "Product 1",
      price: 10.99,
      thumbnail: "img1.jpg",
      quantity: 1,
    },
  ];

  beforeEach(() => {
    // Reset mock implementation and return values
    (addToCart as jest.Mock).mockClear();
    (getCart as jest.Mock).mockReturnValue(mockCart);
  });

  it("should add item to the cart and return updated cart", async () => {
    const newItem: CartItem = {
      id: 2,
      title: "Product 2",
      price: 15.99,
      thumbnail: "img2.jpg",
      quantity: 1,
    };

    const request = {
      json: async () => newItem,
    } as Request;

    const response = await POST(request);

    // Check that addToCart was called with the new item
    expect(addToCart).toHaveBeenCalledWith(newItem);

    // Check that the response has the updated cart
    expect(getCart).toHaveBeenCalled();
    expect(response).toEqual(
      NextResponse.json({
        message: "Item added to cart",
        cart: mockCart,
      })
    );
  });

  it("should return an error response if adding to cart fails", async () => {
    const request = {
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Request;

    const response = await POST(request);

    // Check that the response is an error response
    expect(response).toEqual(
      NextResponse.json(
        { error: "Failed to add item to cart" },
        { status: 500 }
      )
    );
  });
});
