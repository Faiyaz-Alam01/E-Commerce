import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {

	const[userInput, setUserInput] = useState({
		email:"",
		password:"",
		username:""
	});

	console.log(userInput);
	

	function inputValues (e) {		
		const{name,value} = e.target;
		setUserInput(pre => ({
			...pre,
			[name]:value
		}))		
	}


	return (
		<div className='flex justify-center items-center h-md'>
			<form className='border p-8 space-y-2'>
				<div className='flex flex-col'>
					<label htmlFor="username">Username</label>
					<input 
						type="text" 
						name='username' 
						placeholder='Enter Username' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.username}
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor="email">Email</label>
					<input 
						type="text" 
						name='email' 
						placeholder='enter your email' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.email}
						required
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="password">Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='enter your password' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.password}
						required
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="">Confirm Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='Confirm password' 
						className='border px-2 py-1 w-72 rounded-sm'
						onChange={inputValues}
						value={userInput.password}
						required
					/>
				</div>
				<div className='flex justify-end mt-'>
					<Link 
						to={'/forgot'}
						className='text-blue-600 hover:text-blue-700 text-shadow-amber-50 text-sm'
					>forgot password?</Link>
				</div>
				<button type='submit' className='bg-blue-500 hover:bg-blue-600 font-medium w-full rounded-sm py-1 '>
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
