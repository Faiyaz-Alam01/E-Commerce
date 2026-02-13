import ProductCard from "@/Components/ProductCard";
import { useFetch } from "@/hooks/useFetch.js";
import { getAllCategories } from "@/redux/slices/categoriesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const {data:productsData, loading, error} = useFetch("/products/All",{
		credentials: "include",
	});

	const {categoryData} = useSelector(state => state.category);
	// console.log("category", categoryData);
	const limitedCategories = categoryData.slice(0, 5);	
	

	// console.log("productsData:", productsData);
	const products = productsData?.data || [];	
	
	useEffect(()=>{
		const fetchCategory = async () => {
			await dispatch(getAllCategories())
		}
		fetchCategory();
	},[dispatch])

	// async function goToCategory(){
	// 	if(limitedCategories && limitedCategories.length > 0){
	// 		const categorySlug = limitedCategories[0].slug;
	// 		console.log(categorySlug);
			
	// 		navigate(`/products?category=${categorySlug}`);
	// 	}
	// }

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


		{/* category section */}
		<section className="cursor-pointer">
			{limitedCategories && limitedCategories.length > 0 ? (
				<div className="flex gap-4 justify-evenly overflow-x-auto py-2">
					{limitedCategories.map((category) => (
						<div
						key={category._id}
						className="relative h-32 w-48 rounded-lg overflow-hidden cursor-pointer"
						onClick={() => navigate(`/products?category=${category.slug}`)}
						>
						<img
							src={category.image.url}
							alt={category.name}
							loading="lazy"
							className="h-full w-full object-cover"
						/>

						<div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-1">
							{category.name}
						</div>
						</div>
					))}
				</div>
			) : (
				<p>No categories available</p>
			)
			}
		</section>
		
		{/* product section */}
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
