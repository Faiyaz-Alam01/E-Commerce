import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const OrderSummary = () => {
	const [promo, setPromo] = useState('');

	function handleApplyPromo() {
		// console.log("Apply promo code:", promo);
	};
	return (
		<div className='bg-gray-400 flex flex-col w-full md:h-full   p-10 space-y-2'>
			<p>Order Summary</p>
			<div>
				Subtotal(2 items): ₹4999
			</div>
			<div>
				Shipping: ₹0
			</div>
			<hr />
			<div className='text-left'>
				Total: ₹4999
			</div>	
			<div className='flex mt-4'>
				<input 
					type="text" 
					placeholder='Promo code'
					value={promo}
					onChange={(e) => setPromo(e.target.value)}
					className='border px-2 p-1 rounded-md mr-2'
				/>
				<p className='bg-blue-600 text-white pt-1 rounded-md font-medium hover:bg-blue-800 px-6 cursor-pointer'>Apply</p>
			</div>
			<div className='flex flex-col'>
				<button
				onclick={handleApplyPromo}
				className='bg-blue-500 text-white px-4 py-2 cursor-pointer rounded mt-4 hover:bg-blue-600'
				>PLACE ORDER
				</button>
				<Link
					to={'/products'}
					className='border text-center font-medium  px-4 py-2 cursor-pointer rounded mt-4 hover:bg-blue-600'
					>Continue Shopping
				</Link>
			</div>
		</div>
	)
}

export default OrderSummary
