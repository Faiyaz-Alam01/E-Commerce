import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddressForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      console.log("Address Data:", data);

      // API call yaha kar sakte ho
      // await axios.post("/api/address", data);

      alert("Address Added Successfully ✅");
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Add New Address
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit phone number",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Line */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address Line
            </label>
            <textarea
              rows="3"
              {...register("addressLine", {
                required: "Address is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.addressLine ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Street, Area, House No."
            />
            {errors.addressLine && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressLine.message}
              </p>
            )}
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter valid 6 digit pincode",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>
          </div>

          {/* Default Address Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isDefault")}
              className="w-4 h-4 text-blue-600"
            />
            <label className="text-sm text-gray-700">
              Set as default address
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;