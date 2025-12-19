import axiosInstance from "@/helper/axiousInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const signUp = createAsyncThunk('/user/signup', async(userData) => {
	try {
		const res = axiosInstance.post(`/user/signup`, userData);
		toast.promise(res,{
			loading:"Signing up...",
			success:"Signed up successfully",
			error:"Error in signing up"
		})
		return (await res).data;
	} catch (error) {
		toast.error("Something went wrong in signing up");
	}
})
export const userLogin = createAsyncThunk('/user/login', async() => {
	try {
		
	} catch (error) {
		
	}
})
export const userLogout = createAsyncThunk('/user/logout', async() => {
	try {
		
	} catch (error) {
		
	}
})

const authSlice = createSlice({
	name:"auth",
	initialState:{
		data:null,
		isLoggedIn:false,
	},
	reducers:{},
	extraReducers:(builder) => {
		builder
			.addCase(userLogin.fulfilled, (state, action) => {	
				console.log(action?.payload);
				
				state.isLoggedIn = true;
				state.data = action?.payload?.data;
			})
			.addCase(userLogout.fulfilled, (state,action) => {
				state.isLoggedIn = false,
				state.data = ''
			})
	}
})

export default authSlice.reducer