import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getRazorPayId,
  createOrder,
  verifyUserPayment
} from "../../redux/slices/razorpaySlice.js";
import { BiRupee } from "react-icons/bi";

const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const amount = location?.state?.amount;

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const order = useSelector((state) => state?.razorpay?.order);
  const userData = useSelector((state) => state?.auth?.data);

  const paymentdetails = useRef({
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: ""
  });

  async function handlePayment(e) {
    e.preventDefault();

    if (!razorpayKey || !order?.id) {
      toast.error("Payment setup failed");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "Coursify Pvt. Ltd.",
      description: "Course Purchase",

      prefill: {
        email: userData?.email,
        name: userData?.fullName
      },

      handler: async function (response) {

        paymentdetails.current.razorpay_payment_id =
          response.razorpay_payment_id;

        paymentdetails.current.razorpay_order_id =
          response.razorpay_order_id;

        paymentdetails.current.razorpay_signature =
          response.razorpay_signature;

        toast.success("Payment successful");

        const res = await dispatch(
          verifyUserPayment(paymentdetails.current)
        );

        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {

    if (!amount) {
      toast.error("Invalid order");
      navigate("/cart");
      return;
    }

    // await dispatch(getRazorPayId());
    // await dispatch(createOrder(amount));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <form
      onSubmit={handlePayment}
      className="min-h-[90vh] w-full flex justify-center items-center text-white"
    >
     {/* order sumary */}
      <div className="bg-white w-full p-6 rounded-2xl shadow-lg space-y-4 border text-gray-800 max-w-md">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between items-center text-lg">
          <span>Total Amount</span>
          <span className="flex items-center text-2xl font-bold">
            <BiRupee className="mr-1" />
            {amount}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
        >
          Pay Now
        </button>
      </div>    
      
	</form>	
  );
};

export default Checkout;