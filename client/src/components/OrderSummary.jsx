import { applyCoupon } from "@/redux/slices/cartSlice";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = ({ cart }) => {
  console.log(cart);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [promo, setPromo] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!cart) {
    return <p className="p-5">Loading...</p>;
  }

// useEffect(() => {
//   if (cart?.discount > 0) {
//     setPromo(cart.couponCode);
//   } else {
//     setPromo("");
//   }
// }, [cart?.couponCode]);

  const couponCode = cart?.couponCode || "";
  const subTotal = cart?.totalPrice || 0;
  const discount = cart?.discount || 0;

  const shipping = subTotal > 500 ? 0 : 50;
  const tax = Math.round(subTotal * 0.05);

  const total = useMemo(() => {
    return subTotal + shipping + tax - discount;
  }, [subTotal, shipping, tax, discount]);

  // ✅ Apply Coupon
  async function handleApplyCoupon() {
    if (!promo.trim()) {
      toast.error("Enter promo code");
      return;
    }

    try {
      setLoadingCoupon(true);
      setCouponError("");
      setCouponSuccess("");

      const res = await dispatch(applyCoupon(promo));
      console.log(res.payload);

      if (res?.payload?.success) {
        toast.success("Coupon Applied 🎉");
        setCouponSuccess(
          `Coupon Applied 🎉 You saved ₹${res.payload.discount}`
        );
      } else {
        setCouponError(res?.payload?.message || "Invalid Coupon ❌");
      }

    } catch (error) {
      setCouponError("Invalid Coupon ❌");
    } finally {
      setLoadingCoupon(false);
    }
  }

  // ✅ Checkout
  const handleCheckout = () => {
    if (total <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    navigate("/checkout", { state: { amount: total } });
  };

  return (
    <div className="bg-white w-full p-6 rounded-2xl shadow-lg space-y-4 border">
      <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal ({cart?.items?.length || 0} items)</span>
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

      {/* discount */}
      {discount > 0 && (
        <>
          <div className="flex justify-between text-green-600 font-medium">
            <span>Coupon ({couponCode})</span>
            <span>-₹{discount}</span>
          </div>

          <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm text-center">
            🎉 You saved ₹{discount} on this order
          </div>
        </>
      )}

      <hr />

      {discount > 0 && (
        <div className="flex justify-between text-gray-400 line-through">
          <span>Original Total:</span>
          <span>₹{subTotal + shipping + tax}</span>
        </div>
      )}

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className={discount > 0 ? "text-green-600" : ""}>₹{total}</span>
      </div>

      {/* Coupon Section */}
      <div className="space-y-2">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promo}
              disabled={!!cart?.couponCode}
            onChange={(e) => setPromo(e.target.value)}
            className="border px-3 py-2 rounded-l-md w-full outline-none focus:ring-2 focus:ring-blue-400"
          />

          {discount > 0 ? (
            <button
              onClick={async () => {
                await dispatch(removeCoupon());
                setPromo("");
                toast.success("Coupon Removed ✅");
              }}
              className="bg-red-500 text-white px-4 rounded-r-md hover:bg-red-600"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleApplyCoupon}
              disabled={loadingCoupon}
              className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loadingCoupon ? "Applying..." : "Apply"}
            </button>
          )}
        </div>

        {couponSuccess && (
          <div className="bg-green-100 text-green-600 px-3 py-2 rounded text-sm">
            {couponSuccess}
          </div>
        )}

        {couponError && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded text-sm">
            {couponError}
          </div>
        )}
      </div>

      <button
        onClick={handleCheckout}
        type="button"
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