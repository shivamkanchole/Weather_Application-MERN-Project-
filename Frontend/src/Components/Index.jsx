import React from "react";

const Index = () => {
  return (
    <div className=" flex items-center justify-center h-screen bg-gray-100">
      <div className=" bg-white p-8 rounded-lg shadow-md text-center w-auto text-xl">
        <h1 className=" text-inherit font-bold mb-6 text-blue-500">
          Weather Insights App
        </h1>
        <p className="text-gray-600 mb-8">
          Please log in to see the latest weather Insights and personalized
          updates.
        </p>
        <a
          href="/login" // Replace with your login page URL
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

export { Index };
