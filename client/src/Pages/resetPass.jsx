import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/helper/axiousInstance";
import { resetPassword } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPass) {
			alert("Passwords do not match");
			return;
		}

		const res = await dispatch(resetPassword({token, password, confirmPass}));
		if (res.payload?.success) {
			setPassword("");
			setConfirmPassword("");
			navigate("/signin");
		}
	};

	return (
		<div className="min-h-screen">
			<div className='bg-gray-100 p-4 max-w-md mx-auto mt-10'>
				<h2 className="text-center font-bold text-xl">Reset Password</h2>

				<form 
					onSubmit={handleSubmit}
					className="flex flex-col space-y-4  mt-4"
					>
					<input
						type="password"
						placeholder="New Password"
						className="border px-2 py-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="Confirm Password"
						className="border px-2 py-2"
						value={confirmPass}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<button 
						className="border py-1 bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
						type="submit">Reset Password</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;