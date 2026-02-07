import axiosInstance from "@/helper/axiousInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
	wishlistData:[],
}

export const addWishlist = createAsyncThunk('/wishlist/add', async(productId) =>{
	try {
		const res = axiosInstance.post(`/wishlist/add/${productId}`);
		toast.promise(res,{
			loading:"Adding to wishlist...",
			success:"Added wishlist successfully",
			error:"Error  wishlist"
		})
		const data = (await res).data;
		return data;		
	}catch (error) {
		toast.error("Something went wrong in adding wishlist");
	}
});

export const getAllWishlist = createAsyncThunk('/wishlist/getall', async() =>{
	try {
		const res = axiosInstance.get('/wishlist/getAll');
		toast.promise(res,{
			loading:"Loading wishlist...",
			success:"Wishlist loaded successfully",
			error:"Error loading wishlist"
		})
		return (await res).data;
	}catch (error) {
		toast.error("Something went wrong in loading wishlist");	
	}	
});

export const deleteWishlist = createAsyncThunk('/wishlist/delete', async(productId) =>{	
	try {
		const res = axiosInstance.delete(`/wishlist/delete/${productId}`);
		toast.promise(res,{
			loading:"Deleting from wishlist...",
			success:"Deleted from wishlist successfully",
			error:"Error deleting from wishlist"
		})
		return (await res).data;
	} catch (error) {
		toast.error("Something went wrong in deleting from wishlist");
	}
});


	const wishlistSlice = createSlice({
	name:"wishlist",
	initialState,
	reducers:{},	
	extraReducers:(builder) => {
		builder
			.addCase(addWishlist.fulfilled, (state, action) => {
				// console.log(action.payload);
				
				state.wishlistData = action.payload.data;
			})
			.addCase(getAllWishlist.fulfilled,(state, action)=>{
				// console.log(action.payload);

				state.wishlistData=action.payload.data;
			});
	}
	
})

export default wishlistSlice.reducer;