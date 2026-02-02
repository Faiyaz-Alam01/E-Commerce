import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center flex-col p-10 space-y-5">
      <h1 className="text-2xl font-bold mb-10 text-center">Admin Dashboard</h1>

      <div className="grid p-2 grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2 ">
        <Link
          to="/products"
          className="p-5 w-md sm:w-64 md:w-md bg-white border-2 border-gray-300 font-medium rounded-lg text-center hover:bg-blue-200 hover:border-blue-400"
        >
          Get All Products
        </Link>

        <Link
          to="/product/add"
          className="p-5 w-md sm:w-64 md:w-md bg-white border-2 border-gray-300 font-medium rounded-lg text-center hover:bg-green-200 hover:border-green-400"
        >
          Add Product
        </Link>

        <Link
          to="/admin"
          className="p-5 w-md sm:w-64 md:w-md bg-white border-2 border-gray-300 font-medium rounded-lg text-center hover:bg-yellow-200 hover:border-yellow-400"
        >
          Update Product
        </Link>

        <Link
          to="/delete"
          className="p-5 w-md sm:w-64 md:w-md bg-white border-2 border-gray-300 font-medium rounded-lg text-center hover:bg-red-200 hover:border-red-400"
        >
          Delete Product
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
