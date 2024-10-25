import { GET } from "../route";
import { NextResponse } from "next/server";

describe("GET /api/products", () => {
  // After each test clear all mock data to prevent interferance between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return products when fetch is successful", async () => {
    // Define the mock data to represent a successful response form the api
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];

    // Mock the global fetch function to simulate a successful response
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true, // sumulates a 200 status success
      json: async () => ({ products: mockProducts }),
    } as Response);

    // call the GET function wich should use the mocked fetch data
    const response = await GET();
    const jsonResponse = await response.json();

    // verify the fetch was called with the correct api
    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products");
    // check the response data matched the mock data
    expect(jsonResponse).toEqual(mockProducts);
    // check the response is and instance of NextResponse which means it is handlesd correctly
    expect(response).toBeInstanceOf(NextResponse);
  });

  it("should return an error when fetch fails", async () => {
    // mock fetch to simulate failed response
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false, // simulate non 200 status
    } as Response);

    // call GET function which should recognize the failure
    const response = await GET();
    const jsonResponse = await response.json();

    // verify an error message is returned as expected
    expect(jsonResponse).toEqual({ error: "Failed to fetch products" });
    // check response status is 500 indicating server error
    expect(response).toHaveProperty("status", 500);
  });

  it("should handle fetch throwing an exception", async () => {
    // Mock fetch to throw an error
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Network Error"));

    //   call GET function to catch error
    const response = await GET();
    const jsonResponse = await response.json();

    // check to see if correct error message is returned
    expect(jsonResponse).toEqual({ error: "Failed to fetch products" });
    // check response status is 500 indocating server error
    expect(response).toHaveProperty("status", 500);
  });
});
