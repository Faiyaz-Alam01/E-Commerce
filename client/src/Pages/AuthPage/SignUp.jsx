import { signUp } from '@/redux/slices/authSlice';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const[userInput, setUserInput] = useState({
		email:"",
		password:"",
		username:"",
		Cpassword:""
	});
	

	function inputValues (e) {		
		const{name,value} = e.target;
		setUserInput(pre => ({
			...pre,
			[name]:value
		}))		
	}

	const handleSubmit = async (e) => {		
		e.preventDefault();
		if(userInput.email==='' || userInput.password==='' || userInput.username ==='' || userInput.Cpassword===''){
			toast.error("All fields are required");
			return;	
		}

		if(userInput.password.length < 6){
			toast.error("Password must be at least 6 characters long");
			return;
		}

		if(!/\S+@\S+\.\S+/.test(userInput.email)){
			toast.error("Please enter a valid email address");
			return;	
		}

		if(userInput.password !== userInput.Cpassword){
			toast.error("Passwords do not match");
			return;
		}

		const response = await dispatch(signUp(userInput));
		// console.log(response);
		if(response?.payload?.success){
			navigate('/signin');
			setUserInput({
				email:"",
				password:"",
				username:"",
				Cpassword:""
			});
		}
		
	}



	return (
		<div className='flex justify-center items-center h-screen'>
			<form
				noValidate
				onSubmit={handleSubmit } 
				className='border p-8 space-y-2'>
				<div className='flex flex-col'>
					<label htmlFor="username" className='font-medium'>Username</label>
					<input 
						type="text" 
						name='username' 
						placeholder='Enter Username' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.username}
						
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor="email" className='font-medium'>Email</label>
					<input 
						type="email" 
						name='email' 
						placeholder='enter your email' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.email}
						
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="password" className='font-medium'>Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='enter your password' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.password}
						
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="" className='font-medium'>Confirm Password</label>
					<input 
						type='password' 
						name='Cpassword' 
						placeholder='Confirm password' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.Cpassword}
						
					/>
				</div>
				
				<button type='submit' className='bg-blue-500 mt-2 hover:bg-blue-600 text-white font-medium w-full rounded-sm py-1 '>
					Submit
				</button>
				
				<div className='flex justify-center mt-2'>
					<p>Already have an account?{" "}
						<Link 
							to={'/signin'}
							className='text-blue-600 hover:text-blue-700 ml-1 font-normal'
						>SignIn now</Link></p>
				</div>
			</form>
			
		</div>
	)
}

export default SignUp
