import OrderSummary from "@/Components/OrderSummary";
import WhislistCard from "@/Components/whislistCard";
import { getAllWishlist } from "@/redux/slices/wishlistSlice.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlist);

  const product = wishlistData?.products || [];

  useEffect(() => {
    dispatch(getAllWishlist());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {product.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <h2 className="text-xl text-gray-600">
            Your cart is empty
          </h2>

          <Link
            to="/products"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side Products */}
          <div className="flex flex-col gap-4 flex-1">
            {product.map((item) => (
              <WhislistCard
                key={item._id}
                product={item}
              />
            ))}
          </div>

          {/* Right Side Order Summary */}
          <div className="w-full lg:w-[350px] sticky top-10 h-fit">
            <OrderSummary products={product} />
          </div>
        </div>
      )}
    </div>
  );
};
