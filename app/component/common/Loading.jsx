// components/common/Loading.js
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 14.31a6 6 0 1 0-8.62-8.62M16 12a4 4 0 1 1-4-4" />
        </svg>
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
