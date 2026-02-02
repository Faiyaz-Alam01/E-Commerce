import React, { useEffect, useState } from 'react'
import userPng from '../../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { updateProfile } from '@/redux/slices/authSlice'

const Profile = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { data } = useSelector(state => state.auth)
	const userInfo = data?.user	
	

	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		bio: "",
		avatar: "",
		previewImage: "",
	})

	// ✅ redux data → local state
	useEffect(() => {
		if (userInfo) {
			setUserData(prev => ({
				...prev,
				username: userInfo.username || "",
				email: userInfo.email || "",
				bio: userInfo.bio || "",
				avatar: userInfo.avatar || "",
			}))
		}
	}, [userInfo])

	function handleImageUpload(e) {
		const file = e.target.files[0]
		if (file) {
			const fileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = function () {
				setUserData({
					...userData,
					previewImage: this.result,
					avatar: file,
				})
			}
		}
	}

	const userDataInput = (e) => {
		const { name, value } = e.target
		setUserData({
			...userData,
			[name]: value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('username', userData.username)
		formData.append('email', userData.email)
		formData.append('bio', userData.bio)

		// ✅ password tabhi bhejo jab bhara ho
		if (userData.password) {
			formData.append('password', userData.password)
		}

		// ✅ avatar tabhi bhejo jab File ho
		if (userData.avatar instanceof File) {
			formData.append('avatar', userData.avatar)
		}

		const userId = userInfo?._id
		const res = await dispatch(updateProfile({ userId, formData }))

		if (res?.payload?.success) {
			toast.success(res.payload.message)
			navigate('/')
		}
	}

	return (
		<div className='flex justify-center mt-20 mb-2'>
			<form
				onSubmit={handleSubmit}
				className='border relative h-auto w-md p-4 space-y-2 flex flex-col justify-center items-center'
			>
				<div className='w-full absolute left-0 top-0 p-2 flex items-center'>
					<AiOutlineArrowLeft />
					<button
						type='button'
						onClick={() => navigate(-1)}
						className='px-1 font-medium cursor-pointer'
					>
						Back
					</button>
				</div>

				{/* ✅ Avatar */}
				<div className='relative w-24 h-24 border rounded-full overflow-hidden cursor-pointer'>
					<label htmlFor='upload_image'>
						<img
							src={
								userData.previewImage ||
								userInfo?.avatar ||
								userPng
							}
							alt="profile"
							className="size-24 rounded-full object-cover"
						/>
					</label>

					<input
						id='upload_image'
						hidden
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
					/>
				</div>

				<div className='flex flex-col'>
					<label>Username</label>
					<input
						type="text"
						name='username'
						value={userData.username}
						className='border py-1 px-2 w-80 mt-1'
						onChange={userDataInput}
					/>
				</div>

				<div className='flex flex-col'>
					<label>Email</label>
					<input
						type="text"
						name='email'
						value={userData.email}
						className='border py-1 px-2 w-80 mt-1'
						onChange={userDataInput}
					/>
				</div>

				<div className='flex flex-col'>
					<label>Bio</label>
					<textarea
						name='bio'
						value={userData.bio}
						className='border py-1 px-2 h-24 resize-none w-80 mt-1'
						onChange={userDataInput}
						minLength={10}
						maxLength={200}
					/>
				</div>

				<button
					type='submit'
					className='border w-44 mt-4 py-2 font-medium bg-blue-400 hover:bg-blue-600 hover:text-white rounded-xl'
				>
					Update
				</button>
			</form>
		</div>
	)
}

export default Profile
