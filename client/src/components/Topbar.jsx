import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import userPng from '../assets/user.png'
import { userLogout } from '@/redux/slices/authSlice';
import { getCart } from '@/redux/slices/cartSlice';


const Topbar = () => {

	const naviagate = useNavigate();
	const dispatch = useDispatch();

	const {data, isLoggedIn} = useSelector(state => state.auth);
	const userInfo = data?.user;

	const cardData = useSelector((state) => state?.cart?.cart?.items);
	  
	const lengths = cardData?.length || 0;

	const handleLogout = async () => {
		await dispatch(userLogout());
		naviagate('/signin');
	}
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
					{userInfo?.role === 'admin' && 
						<Link to={'/dashboard'} className='hover:text-blue-800'>Dashboard</Link>
					}
				</div>
				{isLoggedIn &&
					<div className="flex items-center gap-4">
						<div className="cursor-pointer relative" onClick={() => naviagate('/cart')}>
							<IoCartOutline size={24} />
							<span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
							{lengths}
							</span>
						</div>
				
						<img 
							onClick={() => naviagate('/profile')}
							className='border size-9 rounded-full cursor-pointer'
							src={userInfo?.avatar || userPng} alt="logo" 
						/>
						
						<button 
							onClick={handleLogout}
							className='text-white px-2 py-1 rounded-md font-medium bg-red-500 hover:bg-red-700 cursor-pointer '>Logout
						</button>	
				
					</div>
				}
				
				{!isLoggedIn &&
					<div>
						<Link to={'/signup'} className='hover:text-blue-800 font-medium'>SignUp</Link>
					</div>
				}


			</div>
		</div>
	)
}

export default Topbar
