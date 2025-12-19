import React from 'react'
import userPng from '../../assets/user.png'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

	const navigate = useNavigate();
	return (
		<div className='flex justify-center mt-20 mb-2'>
			<div className='border relative h-auto w-md p-4 space-y-2 flex flex-col justify-center items-center'>
				<button 
					onClick={() => navigate(-1)}
					className='absolute left-0 p-2 px-4 top-0 font-medium cursor-pointer'
				>Back</button>
				<img 
					className='size-24 '
					src={userPng} alt="" 
				/>
				<div className='flex flex-col '>
					<label htmlFor="">Name</label>
					<input 
						type="text" 
						placeholder='enter name'
						value={''}
						className='border py-1 px-2 w-80 mt-1'
						onChange={''}
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="">Email</label>
					<input 
						type="text" 
						placeholder='enter email'
						value={''}
						className='border py-1 px-2 w-80 mt-1'
						onChange={''}
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="">Password</label>
					<input 
						type="text" 
						placeholder='enter Password'
						value={''}
						className='border py-1 px-2 w-80 mt-1'
						onChange={''}
					/>
				</div>
				<div className='flex flex-col '>
					<label htmlFor="">Bio</label>
					<textarea 
						type="text" 
						placeholder='enter Password'
						// value={''}
						className='border py-1 px-2 h-24 resize-none w-80 mt-1'
						// onChange={''}
						minLength={10}
						maxLength={200}

					/>
				</div>

				<button
					type='submit'
					className='border w-44 mt-4 py-2 font-medium bg-blue-400 hover:bg-blue-600 hover:text-white rounded-xl outline-none'
				>Update</button>
			</div>
		</div>
	)
}

export default Profile
