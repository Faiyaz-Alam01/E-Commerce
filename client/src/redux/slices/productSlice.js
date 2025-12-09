import axiosInstance from "@/helper/axiousInstance"
import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
	productData:[]
}

export const getAllProducts = createAsyncThunk('/product/get', async() =>{
	try {
		const res = axiosInstance.get('/products/All');
		toast.promise(res,{
			loading:"Loading products...",
			success:"Products loaded successfully",
			error:"Error in loading products"
		})
		const data = (await res).data;
		return data;
		
	} catch (error) {
		toast.error("Something went wrong in fetching products");
	}
})

const productSlice = createSlice({
	name:"product",
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder	
			.addCase(getAllProducts.fulfilled, (state, action)=>{
				// console.log("action payload", action.payload);
				if(action.payload){
					state.productData = [...action.payload.data];
				}
			})
			// .addCase(deleteProduct.fulfilled, (state, action)=>{
			// 	state.productData=[];
			// })
	}
})

export default productSlice.reducer