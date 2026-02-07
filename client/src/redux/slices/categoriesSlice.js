import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
	categoryData:[]
}

export const getAllCategories = createAsyncThunk('/categories/get', async() =>{
	try {
		const res = axiosInstance.get('/categories/getAll');
		toast.promise(res,{
			loading:"Loading categories...",
			success:"Categories loaded successfully",
			error:"Error in loading categories"
		})
		const data = (await res).data;
		return data;
		
	} catch (error) {
		toast.error("Something went wrong in fetching categories");
	}
})

const categoriesSlice = createSlice({
	name:"categories",
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder	
			.addCase(getAllCategories.fulfilled, (state, action)=>{
				// console.log("action payload", action.payload);
				if(action.payload){
					state.categoryData = [...action.payload.data];
				}
			})
	}
})

export default categoriesSlice.reducer
