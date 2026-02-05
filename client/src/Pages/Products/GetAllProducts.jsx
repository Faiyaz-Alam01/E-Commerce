import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getFilteredProducts } from "@/redux/slices/productSlice";
import { useDebounce } from "@/hooks/useDebounce";
import FilterSidebar from "@/Components/FilterSidebar";
import ProductCard from "@/Components/ProductCard";

export const GetAllProducts = () => {
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    search: "",
    category: "All",
    brand: "",
    price: 0,
  });

  // Debounced search & price
  const debounceSearch = useDebounce(filterData.search, 500);
  const debouncePrice = useDebounce(filterData.price, 500);

  const { productData, filteredData } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Apply filters when debounced values or category/brand change
  useEffect(() => {
    const activeFilters = {
      search: debounceSearch,
      price: debouncePrice,
      brand: filterData.brand,
    };

    // Only add category if not "All"
    if (filterData.category !== "All") {
      activeFilters.category = filterData.category;
    }

    // Check if any filter is active
    const isFilterActive =
      activeFilters.search ||
      activeFilters.category ||
      activeFilters.brand ||
      activeFilters.price > 0;

    if (isFilterActive) {
      dispatch(getFilteredProducts(activeFilters));
    }
  }, [debounceSearch, debouncePrice, filterData.category, filterData.brand, dispatch]);

  // Decide which products to display
  const iSFilterActive =
    filterData.search ||
    (filterData.category && filterData.category !== "All") ||
    filterData.brand ||
    filterData.price > 0;

  const displayProducts = iSFilterActive ? filteredData : productData;

  return (
    <div className="h-auto m-10 p-5 border-2 font-bold text-xl border-gray-300 rounded-lg">
      <h1 className="text-center p-4">All Products Page</h1>

      <div className="flex gap-4 flex-col md:flex-row">
        {/* Filter Sidebar */}
        <FilterSidebar
          filterData={filterData}
          setFilterData={setFilterData}
          product={productData}
        />

        {/* Products Display Section */}
        <div className="h-auto md:h-54 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayProducts && displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
