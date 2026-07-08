import React from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const CheckoutFail = () => {

	return (
		<div className='flex justify-center items-center min-h-[90vh] text-white'>
			<div className='w-80  h-104 flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative'>
				<h1 className='bg-red-500 absolute top-0 w-full  py-4 text-2xl font-bold text-center rounded-tl-lg rounded-tr-lg'>Payment Failed</h1>

				<div className='px-4 flex flex-col items-center justify-center space-y-2'>
					<div className='text-lg space-y-2 text-center'>
						<h2>Oops ! Your payment failed</h2>
						<p className=''>
							please try again later
						</p>
					</div>
					<RxCrossCircled className='text-red-500 text-5xl' />
				</div>
				<Link to={'/checkout'} className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-extrabold text-center rounded-bl-lg rounded-br-lg '>
					<button>Try again</button>
				</Link>
			</div>
		</div>
	
	)
}

export default CheckoutFail
