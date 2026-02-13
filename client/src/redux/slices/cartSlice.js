import axiosInstance from "@/helper/axiousInstance"
import toast from "react-hot-toast"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
	cart:null,
}

export const addToCart = createAsyncThunk('/cart/add', async({productId, quantity}) =>  {
	try {
		const res = axiosInstance.post('/cart',{productId, quantity})
		toast.promise(res, {
			loading: "adding to cart...",
			success: (data) =>{
				return data?.data?.message || "successfully added to cart"
			},
			error: "error adding to cart"
		})

		return (await res).data
	} catch (error) {
		toast.error(error?.response?.data?.message || "product added to cart failed.");
		throw error;
	}
})

export const getCart = createAsyncThunk('/get/items', async() => {
	try {
		const res = axiosInstance.get('/cart')
		toast.promise(res, {
			loading: 'fetching cart data ...',
			success : (data)=>{
				return data?.data?.message || "successfully fetched data"
			},
			error: "failed fetch data"
		})

		return (await res).data;

	} catch (error) {
		toast.error(error?.response?.data?.message || "product fetched failed.");
		throw error;
	}
})

export const removeItem =createAsyncThunk('/remove/item', async(productId) => {	
	try {
		const res = axiosInstance.delete(`/cart/${productId}`);
		toast.promise(res, {
			loading:"removing items...",
			success:(data)=>{
				return (data?.data?.message || "removed successfully")
			},
			error: "failed to remove data"
		})

		return (await res).data;
	} catch (error) {
		console.log(error);
		
		toast.error(error?.response?.data?.message || 'failed to remove items')
	}
})

const cartSlice = createSlice({
	name:"cart",
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder
			.addCase(getCart.fulfilled, (state, action) => {
				// console.log(action.payload);
				state.cart = action.payload.data;
			})
	}
})

export default cartSlice.reducer;