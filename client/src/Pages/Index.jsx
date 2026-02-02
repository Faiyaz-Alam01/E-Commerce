import ProductCard from "@/Components/ProductCard";
import { useFetch } from "@/hooks/useFetch.js";
import { getAllCategories } from "@/redux/slices/categoriesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Index = () => {
	const dispatch = useDispatch();

	const {data:productsData, loading, error} = useFetch("/products/All",{
		credentials: "include",
	});
	// console.log("productsData:", productsData);
	const products = productsData?.data || [];	
	
	useEffect(()=>{
		const fetchCategory = async () => {
			await dispatch(getAllCategories())
		}
		fetchCategory();
	},[dispatch])

	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
		<section className="text-center py-10">
			<h1 className="text-3xl font-bold text-gray-800">
			Welcome to Faiyaz Store
			</h1>
			<p className="text-gray-600 mt-2">
			Buy the best products at affordable prices.
			</p>
		</section>


		<section className="mt-10">
			<h2 className="text-xl font-semibold mb-4">Categories</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			<div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-700">Category 1</div>
			<div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-700">Category 2</div>
			<div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-700">Category 3</div>
			<div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-700">Category 4</div>
			</div>
		</section>

		<section className="mt-10">
			<h2 className="text-xl font-semibold mb-4">Popular Products</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
				{products && products.length > 0 ? 
				(
					products.map(product => 
						<ProductCard key={product._id} product={product}/>
					)
				):(
					<div>Invalid Products</div>
				)}
			</div>
		</section>

		</div>
	);
};

export default Index;
