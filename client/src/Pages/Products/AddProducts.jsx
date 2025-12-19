import React from 'react'

const AddProducts = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='border w-full max-w-2xl p-5 rounded-md shadow-md mt-10'>
				<h1 className='font-bold text-center text-2xl mt-2'>Add Product</h1>
				<form className='flex flex-col max-w-md mx-auto gap-4 mt-5'>
					<input 
						type="text" 
						placeholder='Title' 
						className='border-2 p-2 rounded-md'
					/>
					<input 
						type="text" 
						placeholder='Description' 
						className='border-2 p-2 rounded-md'
					/>
					<input 
						type="number"
						placeholder='Price' 
						className='border-2 p-2 rounded-md'
					/>
					<input 
						type='file' 
						accept='image/*'
						placeholder='Thumbnail URL' 
						className='border-2 p-2 rounded-md'
					/>
					<div>
						<label>Upload 5 Extra Images</label>
						<input 
						type='file'
						accept="image/*"
						multiple
						onChange={''}
						className='border-2 p-2 rounded-md w-full'
						/>
						 <p className="text-sm text-gray-600">Max 5 images allowed.</p>
					</div>
					<button 
						type='submit' 
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
					>
						Add Product
					</button>
				</form>
			</div>
		</div>
	)
}

export default AddProducts
