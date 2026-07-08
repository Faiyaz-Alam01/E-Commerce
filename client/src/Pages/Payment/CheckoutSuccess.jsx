import React from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {	
	
	return (
		<HomeLayouts>
			<div className='flex justify-center items-center min-h-[90vh] text-white'>
				<div className='w-80  h-104 flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative'>
					<h1 className='bg-green-500 absolute top-0 w-full  py-4 text-2xl font-bold text-center rounded-tl-lg rounded-tr-lg'>Payment Successfull</h1>

					<div className='px-4 flex flex-col items-center justify-center space-y-2'>
						<div className='text-lg space-y-2 text-center'>
							<h2>Welcome to the basic bundle</h2>
							<p className=''>
								Now you can enjoy all the course
							</p>
						</div>
						<AiFillCheckCircle className='text-green-500 text-5xl' />
					</div>
					<Link to={'/'} className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-extrabold text-center rounded-bl-lg rounded-br-lg '>
						<button>Go to dashboad</button>
					</Link>
				</div>
			</div>
		
		</HomeLayouts>
	)
}

export default CheckoutSuccess
