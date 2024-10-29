import { GET } from "../route";
import { NextResponse } from "next/server";

describe("GET /api/products/[id]", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the product when fetch is successful", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    const mockRequest = new Request("http://localhost:3000/api/products/1");
    const mockParams = { params: { id: "1" } };

    // Mock global fetch to simulate successful response
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    } as Response);

    const response = await GET(mockRequest, mockParams);
    const jsonResponse = await response.json();

    // Verify that fetch was called with correct URL
    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products/1");

    // Check that the response contains the expected product data
    expect(jsonResponse).toEqual(mockProduct);

    // Verify that the response is an instance on NextResponse
    expect(response).toBeInstanceOf(NextResponse);
  });

  it("should return an error when fetch fails", async () => {
    const mockRequest = new Request("https://dummyjson.com/products/999");
    const mockParams = { params: { id: "999" } };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    const response = await GET(mockRequest, mockParams);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      error: "Failed to fetch product with id 999",
    });
    expect(response).toHaveProperty("status", 500);
  });
});
