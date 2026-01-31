import { forgotPassword } from "@/redux/slices/authSlice";
import React, { useState } from "react";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {

	const dispatch = useDispatch();

	const[error, setError] = useState("");
	const [success, setSuccess] = useState("");


	const onSubmit = async(e) => {
		e.preventDefault();
		const email = e.target.email.value;

		if(email === ''){
			alert("Email is required");
			setError("Email is required");
			return;
		}

		if(!/\S+@\S+\.\S+/.test(email)){
			alert("Please enter a valid email address");
			setError("Please enter a valid email address");
			return;	
		}

		const res = await dispatch(forgotPassword({email}));
		if (res?.payload?.success) {			
			setSuccess(res.payload.message);
			setError("");
		}else{
			setError(res.payload.message);
			setSuccess("");
		}
		
		
		
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form 
				onSubmit={onSubmit}
				noValidate
				className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
				<h2 className="text-xl font-semibold text-center mb-4">
					Verify Your Email
				</h2>

				<div className="flex flex-col gap-2">
				<label className="text-sm text-gray-600">
					Enter your email
				</label>

				<input
					type="email"
					name="email"
					placeholder="example@gmail.com"
					className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				</div>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				{success && <p className="text-green-500 text-sm mt-2">{success}</p>}


				<button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
