import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoCartOutline } from "react-icons/io5";


const Topbar = () => {
	return (
		<div>
			<div className='bg-blue-300 h-16 flex justify-between items-center px-10'>
				<div className='size-12'>
					<img 
						src={logo} 
						alt='logo'
						className='w-full' 
					/>
				</div>
				<div className='flex gap-3 font-medium text-md'>
					<Link to ={'/'} className='hover:text-blue-800'>Home</Link>
					<Link to={'/products'} className='hover:text-blue-800'>Products</Link>
					<Link to={'/contact'} className='hover:text-blue-800'>Contact</Link>
					<Link to={'dashboard'} className='hover:text-blue-800'>Dashboard</Link>
					{/* <Link>Cart</Link>
					<Link>whishlist</Link> */}
				</div>
				<div className="flex items-center gap-4">
					<div className="relative">
						<IoCartOutline size={24} />
						<span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
						1
						</span>
					</div>

					<div>
						<Link to={'/signup'} className='hover:text-blue-800 font-medium'>SignUp</Link>
					</div>
				</div>


			</div>
		</div>
	)
}

export default Topbar
