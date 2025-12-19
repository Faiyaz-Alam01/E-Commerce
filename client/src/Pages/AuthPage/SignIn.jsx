import { userLogin } from '@/redux/slices/authSlice';
import React, { use, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const[userInput, setUserInput] = useState({
		email:"",
		password:""
	});
	

	function inputValues (e) {		
		const{name,value} = e.target;
		setUserInput(pre => ({
			...pre,
			[name]:value
		}))		
	}

	const handleSubmit = async(e) => {		
		e.preventDefault();

		if(userInput.email==='' || userInput.password===''){
			alert("All fields are required");
			return;	
		}

		if(userInput.password.length < 6){
			alert("Password must be at least 6 characters long");
			return;
		}

		if(!/\S+@\S+\.\S+/.test(userInput.email)){
			alert("Please enter a valid email address");
			return;	
		}

		const response = await dispatch(userLogin(userInput));
		if(response?.payload?.success){	
			navigate('/');
			setUserInput({
				email:"",
				password:""
			});
		}
	}



	return (
		<div className='flex justify-center items-center h-screen'>
			<form 
				noValidate
				onSubmit={handleSubmit}
				className='border p-8 space-y-2'>
				<div className='flex flex-col'>
					<label htmlFor="email" className='font-medium'>Email</label>
					<input 
						type="text" 
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
				<button type='submit' className='bg-blue-500 hover:bg-blue-600 font-medium w-full rounded-sm py-1 mt-4'>
					Submit
				</button>
				
				<div className='flex justify-center mt-2'>
					<p>Don't have an account?{""}
						<Link 
							to={'/signup'}
							className='text-blue-600 hover:text-blue-700 ml-1 font-normal'
						>SignUp now</Link></p>
				</div>
			</form>
			
		</div>
	)
}

export default SignIn
