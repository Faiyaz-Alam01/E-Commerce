import ProductCard from '@/Components/ProductCard'
import { getAllProducts } from '@/redux/slices/productSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const GetAllProducts = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	  const [price, setPrice] = useState(0);

	const {productData} = useSelector((state) => state.product);
	console.log(productData);	

	useEffect(() => {
		 dispatch(getAllProducts());
	}, [dispatch]);

	const categoryData = [
		{ id: 1, name: 'Mobile' },
		{ id: 2, name: 'Headphones' },
		{ id: 3, name: 'Laptop' },
		{ id: 4, name: 'TV' }
	];
	

	return (
		<div className='h-screen m-10 p-5 border-2 font-bold text-xl border-gray-300 rounded-lg'>
			<h1 className='text-center p-4'>All Products Page</h1>
			<div className='flex gap-4 h-[80%] flex-col md:flex-row'>
				{/* Here will be displayed all functionality */}
				<div className='bg-gray-400 max-w-56 h-96 space-y-2 p-2'>
					<input 
						type="text"
						placeholder='Search Products...'
						className='w-48 font-normal text-sm outline-none border-2 bg-white border-gray-200 rounded-sm py-1 px-2 mt-4 ml-2'
					/>
					{/* Category */}
					<div className='ml-2 space-y-0.5 text-sm font-normal'>
						<p className='font-medium text-sm'>Category</p>
						{categoryData.map((category) => (
							<div key={category.id} className=''>
								<input 
									type="radio"
									id={category.name}
									name="category"
									value={category.name}
								/>
								<label for={category.name} className='ml-1'>{category.name}</label>
							</div>
						))}
						
					</div>
					{/* Brand */}
					<div className='ml-2'>
						<label for="brand" className='text-sm'>Brand:</label>
						<select id='brand' className='w-48 font-normal text-sm outline-none border-2 bg-white border-gray-200 rounded-sm px-2'>
							<option value="" disabled selected>Select Brand</option>
							<option value="samsung">Samsung</option>
							<option value="iphone">Iphone</option>
							<option value="oneplus">Oneplus</option>
							<option value="hp">HP</option>
							<option value="asus">Asus</option>
						</select>
					</div>

					{/* Price Range */}
					<div className='ml-2'>
						<label for="price" className=' text-sm'>Price Range:</label>
						<p className='text-xs font-normal text-gray-900'>Price Range:₹0 - ₹1000000</p>
						<input 
							type="range"
							id="price"
							name="price"
							min="0"
							max="100000"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className='w-48'
						/>	
      					<span className='ml-2 font-medium'>₹{price}</span>
					</div>

					<button 
						className='text-center bg-blue-400 px-4 w-full font-medium text-xl hover:bg-blue-600 hover:text-white py-0.5 text rounded-lg'
						type='submit'
					>Reset Filters
					</button>

				</div>

				<div className='flex h-52 gap-4'>
					{productData && productData.length > 0 ? (
						productData.map((product) => (
							<ProductCard key={product._id} product={product}/>
						))
					) : (
						<p>No products available.</p>
					)}
				</div>
			</div>
		</div>
	)
}