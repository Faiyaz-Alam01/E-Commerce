import axiosInstance from "@/helper/axiousInstance"
import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
	filteredData:[],
	productData:[]
}

export const getFilteredProducts = createAsyncThunk('/products/getFilteredProducts', async(filterData) =>{		
	try {
		const res = axiosInstance.get('/products/filters',{
			params: {
				search: filterData.search || "",
				category: filterData.category || "",
				brand: filterData.brand || "",
				price: filterData.price || "",
				all: filterData.all ||" ",
			}});
		toast.promise(res,{
			loading:"Applying Filters...",
			success:"Filters applied successfully",
			error:"Error in applying filters"
		})
		const {data} = (await res);;
		return data;
		
	} catch (error) {
		console.log(error);
		
		toast.error("Something went wrong in applying filters");	
		throw error;
	}
});

export const getAllProducts = createAsyncThunk('/product/get', async() =>{
	try {
		const res = axiosInstance.get('/products/all');
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
				if(action.payload){
					state.productData = [...action.payload.data];
				}
			})
			.addCase(getFilteredProducts.fulfilled,(state,action)=>{
				state.filteredData = action.payload.data || [];
				
			});

	}
})

export default productSlice.reducer