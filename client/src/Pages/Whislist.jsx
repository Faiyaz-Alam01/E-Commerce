import OrderSummary from '@/Components/OrderSummary'
import WhislistCard from '@/Components/whislistCard'
import { getAllWishlist } from '@/redux/slices/wishlistSlice.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Wislist = () => {

	const dispatch = useDispatch();
	const {wishlistData} = useSelector((state) => state.wishlist);
	// console.log(wishlistData);
	const product = wishlistData?.products || [];

	useEffect(() => {	
		dispatch(getAllWishlist());	
	}, [dispatch]);
	
	return (
		<div className='bg-gray-500 min-h-screen space-y-2 p-10'>
			<h1 className='text-2xl font-bold pl-4'>Shopping Cart</h1>
			<div className=" flex flex-col overflow-auto md:flex-row ">
				<div className="flex flex-col gap-2 w-full p-4">
					{product && product.length > 0 ? (
					product.map((item) => (
						<WhislistCard key={item._id} product={item} />
					))
					) : (
					<h2>Your wishlist is empty</h2>
					)}
				</div>

				{product && product.length > 0 && (
					<div className="p-4">
						<OrderSummary products={product} />
					</div>
				)}

				{product && product.length === 0 && 
					<div className='text-center mt-20 text-white p-4'>
						<Link to="/products" className=' bg-blue-400 px-2 py-2 rounded-md hover:bg-blue-600 '>Go and Shoping</Link>
					</div>
				}
			</div>
		</div>

	)
}
