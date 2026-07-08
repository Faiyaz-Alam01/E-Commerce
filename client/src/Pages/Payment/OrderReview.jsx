import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const OrderReview = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 🔥 Fetch Address from Server
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get("/api/address");

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddress(data[0]);
        } else {
          setShowForm(true); // if no address exist
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // 🔥 Add Address API
  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post("/api/address", formData);

      setAddresses([...addresses, data]);
      setSelectedAddress(data);
      setShowForm(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* If No Address → Show Form */}
        {showForm ? (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Add Delivery Address
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Required" })}
                className="w-full p-2 border rounded"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

              <input
                type="text"
                placeholder="Phone"
                {...register("phone", { required: "Required" })}
                className="w-full p-2 border rounded"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

              <textarea
                placeholder="Address Line"
                {...register("addressLine", { required: "Required" })}
                className="w-full p-2 border rounded"
              />
              {errors.addressLine && <p className="text-red-500">{errors.addressLine.message}</p>}

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: "Required" })}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="State"
                  {...register("state", { required: "Required" })}
                  className="p-2 border rounded"
                />
              </div>

              <input
                type="text"
                placeholder="Pincode"
                {...register("pincode", { required: "Required" })}
                className="w-full p-2 border rounded"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Address
              </button>
            </form>
          </div>
        ) : (
          /* Show Saved Address */
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600"
              >
                + Add New
              </button>
            </div>

            <div className="mt-4 border p-4 rounded bg-gray-50">
              <p className="font-semibold">{selectedAddress.fullName}</p>
              <p>{selectedAddress.addressLine}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.state} -{" "}
                {selectedAddress.pincode}
              </p>
              <p>Phone: {selectedAddress.phone}</p>
            </div>

            {/* <select
              className="w-full mt-4 p-2 border rounded"
              onChange={(e) =>
                setSelectedAddress(
                  addresses?.find((a) => a._id === e.target.value)
                )
              }
            >
              {addresses?.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.fullName} - {addr.city}
                </option>
              ))}
            </select> */}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white p-6 rounded-2xl shadow h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between">
          <p>Total</p>
          <p>₹1548</p>
        </div>

        <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderReview;