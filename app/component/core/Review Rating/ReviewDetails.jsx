import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

function ReviewDetails({ data, avrageRating }) {
  const [showAll, setShowAll] = useState(false);

  const displayedRating = avrageRating ? avrageRating.toFixed(1) : "0.0";

  // Sort reviews by creation date (newest first)
  const sortedData = data
    ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Determine the reviews to display (first 10 or all)
  const reviewsToShow = showAll ? sortedData : sortedData.slice(0, 10);

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      {/* Average Rating Section */}
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center mt-2">
          <ReactStars
            count={5}
            value={displayedRating || 0}
            size={30}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          />
          <span className="ml-2 text-xl text-gray-600">{displayedRating}</span>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="relative space-y-6">
        <div
          className={`transition-all ${
            !showAll ? "max-h-[30rem] overflow-hidden" : ""
          }`}
        >
          {reviewsToShow && reviewsToShow.length > 0 ? (
            reviewsToShow.map((review, index) => (
              <div
                key={index}
                className="p-5 bg-white shadow-md rounded-lg flex items-start space-x-4"
              >
                <Image
                  src={review?.user?.image}
                  alt={`${review?.user?.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {review?.user?.name}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review?.rating}
                      size={24}
                      edit={false}
                      isHalf={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-700">{review?.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews available.</p>
          )}
        </div>

        {/* Gradient Effect */}
        {!showAll && sortedData.length > 10 && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Show More Button */}
      {!showAll && sortedData.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-black"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewDetails;
