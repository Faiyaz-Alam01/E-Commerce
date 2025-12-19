import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {

	const[userInput, setUserInput] = useState({
		email:"",
		password:""
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
		<div className='flex justify-center items-center h-screen'>
			<form className='border p-8 space-y-2'>
				<div className='flex flex-col'>
					<label htmlFor="email" className='font-medium'>Email</label>
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
					<label htmlFor="password" className='font-medium'>Password</label>
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
