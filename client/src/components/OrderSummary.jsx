import axiosInstance from "@/helper/axiousInstance";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const OrderSummary = () => {

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");


  const cartData = useSelector((state) => state.cart.cart);

  const subTotal = cartData?.totalPrice || 0;
  const shipping = subTotal > 500 ? 0 : 50;
  const tax = Math.round(subTotal * 0.05);

  const total = useMemo(() => {
    return subTotal + shipping + tax - discount;
  }, [subTotal, shipping, tax, discount]);

  async function handleApplyCoupon() {
    console.log("Applying coupon:", promo);
    if (!promo.trim()) {
      toast.error("Enter promo code");
      return;
    }

    try {
      setLoadingCoupon(true);
      setCouponError("");

      const res = await axiosInstance.post(
        "/coupon/apply-coupon",
        { code: promo }
      );

      console.log("Coupon response:", res.data);

      if (res?.data?.success) {
        const cart = res.data.data.cart;
        setDiscount(cart.discount);
        setCouponSuccess(`Coupon Applied 🎉 You saved ₹${cart.discount}`);
        toast.success(`Coupon Applied 🎉 You saved ₹${cart.discount}`);
      }

    } catch (error) {
      setDiscount(0);
      setCouponError(
        error.response?.data?.message || "Invalid Coupon ❌"
      );
    } finally {
      setLoadingCoupon(false);
    }
  }

  if (!cartData) {
    return <p className="p-5">Loading...</p>;
  }

  return (
    <div className="bg-white w-full p-6 rounded-2xl shadow-lg space-y-4 border">

      <h2 className="text-xl font-semibold border-b pb-2">
        Order Summary
      </h2>

      <div className="flex justify-between">
        <span>Subtotal ({cartData?.items?.length || 0} items)</span>
        <span>₹{subTotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span className={shipping === 0 ? "text-green-600" : ""}>
          {shipping === 0 ? "Free" : `₹${shipping}`}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Tax (5%)</span>
        <span>₹{tax}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>
      )}

      <hr />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* COUPON BOX */}
      <div className="space-y-2">

          <div className="flex">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="border px-3 py-2 rounded-l-md w-full outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleApplyCoupon}
              disabled={loadingCoupon}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loadingCoupon ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Success message */}
          {couponSuccess && (
            <div className="bg-green-100 text-green-600 px-3 py-2 rounded text-sm">
              {couponSuccess}
            </div>
          )}

          {/* Error message */}
          {couponError && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded text-sm">
              {couponError}
            </div>
          )}

      </div>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        PLACE ORDER
      </button>

      <Link
        to={"/products"}
        className="block text-center border py-2 rounded-lg hover:bg-gray-100"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default OrderSummary;
