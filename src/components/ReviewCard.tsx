"use client";
import { Product } from "@/types";
import Image from "next/image";

interface ReviewCardProps {
  loading: boolean;
  product: Product | null;
  error: string | null;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ loading, product, error }) => {
  // Helper function to generate a random number for Picsum
  const getRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `https://picsum.photos/id/${randomId}/200/200`;
  };

  return (
    <>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}

      {!loading && product && product.reviews && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div>
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="flex items-start mb-4 border-b border-gray-200 pb-4"
              >
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                        src={
                          // review.profilePicture ||
                          getRandomImageUrl()
                        } // Default image if none provided
                        alt="Profile picture"
                        height={500}
                        width={500}
                      />
                      <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="flex items-baseline">
                    <span className="text-gray-600 font-bold">
                      {review.reviewerName}
                    </span>
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`w-4 h-4 fill-current ${
                          starIndex < review.rating
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <div className="mt-3">
                    <p className="mt-1">{review.comment}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                    <div className="flex items-center">
                      <span>Was this review helpful?</span>
                      <button className="flex items-center ml-6">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" />
                        </svg>
                        {/* <span className="ml-2">{review.helpfulCount}</span> */}
                      </button>
                      <button className="flex items-center ml-4">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2h1v20h-1z" />
                        </svg>
                        <span className="ml-2">Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
