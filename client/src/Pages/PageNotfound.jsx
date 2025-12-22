import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 px-4">
			<div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
				
				<h1 className="text-7xl font-extrabold text-red-600 mb-4">
					404
				</h1>

				<h2 className="text-2xl font-semibold text-gray-800 mb-2">
					Page Not Found
				</h2>

				<p className="text-gray-600 mb-6">
					Sorry, the page you are looking for doesnt exist or has been moved.
				</p>

				<button
					onClick={() => navigate("/")}
					className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
				>
					Go Back Home
				</button>

			</div>
		</div>
	);
};

export default PageNotFound;
