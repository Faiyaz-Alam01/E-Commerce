import { getFilteredProducts } from "@/redux/slices/productSlice.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FilterSidebar = ({ filterData, setFilterData, product }) => {

	const uniqueCategory = ["All",...new Set(product.map((p) => p.category))];
	// console.log(uniqueCategory);
	const uniqueBrand = [...new Set(product.map((p) => p.brand))];
	//   console.log(uniqueBrand);  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const resetFilters = () => {
    setFilterData({
      search: "",
      category: "All",
      brand: "",
      price: 0
    })
  }

  return (
    <div>
      {/* Here will be displayed all functionality */}
      <div className="bg-gray-400 max-w-56 h-auto space-y-4 p-2 py-4">
        <input
          type="text"
		  name="search"
		  value={filterData?.search}
		  onChange={handleFilterChange}
          placeholder="Search Products..."
          className="w-48 font-normal text-sm outline-none border-2 bg-white border-gray-200 rounded-sm py-1 px-2 mt-4 ml-2"
        />
        {/* Category */}
        <div className="ml-2 space-y-2 ">
          <p className="text-sm font-semibold text-gray-700 border-b pb-1">
            Category
          </p>
          {uniqueCategory &&
            uniqueCategory.length > 0 &&
            uniqueCategory.map((category, index) => (
              <div key={index} className="flex items-center text-center gap-2">
                <input
                  type="radio"
                  id={category}
                  name="category"
				        checked={filterData.category.toLowerCase() === category.toLowerCase()}
                  value={category}
				        onChange={handleFilterChange}
                  className="accent-blue-600 cursor-pointer"
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium text-gray-800 capitalize"
                >
                  {category}
                </label>
              </div>
            ))}
        </div>

        {/* Brand */}
        <div className="ml-2 space-y-2">
          <p className="text-sm font-semibold text-gray-700 border-b pb-1">
            Brand
          </p>

          <select
            name="brand"
			value={filterData.brand}
			onChange={handleFilterChange}
            className="w-44 text-sm font-medium outline-none border border-gray-300 bg-white rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Brand</option>

            {uniqueBrand?.length > 0 &&
              uniqueBrand.map((brand, index) => (
                <option key={index} value={brand} className="capitalize">
                  {brand}
                </option>
              ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="ml-2 space-y-1">
          <p className="text-sm font-semibold text-gray-700 border-b pb-1">
            Price Range
          </p>

          <p className="text-xs text-gray-600">₹0 - ₹{filterData.price}</p>

          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="100000"
            value={filterData.price}
            onChange={handleFilterChange}
            className="w-44 accent-blue-600 cursor-pointer"
          />

          <span className="text-sm font-medium text-gray-800">
            Selected: ₹{filterData.price}
          </span>
        </div>

        <button
          className="text-center border bg-blue-500 text-sm px-4 w-full font-medium  py-1 hover:bg-blue-600 hover:text-white text rounded-lg"
          type="submit"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
