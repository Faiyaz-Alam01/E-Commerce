import axiosInstance from "@/helper/axiousInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const signUp = createAsyncThunk('/user/signup', async(userData) => {
	try {
		const res = axiosInstance.post(`/users/register`, userData);
		toast.promise(res,{
			loading:"Signing up...",
			success:(res) => {
				console.log(res);
				
				return res?.data?.message || "Signup successful 🎉"
			},
			error:"Error in signing up"
		})
		return (await res).data;
	} catch (error) {
		toast.error("Signup failed. Please try again.");
	}
})

export const userLogin = createAsyncThunk('/user/login', async(userData) => {
	try {
		const res = axiosInstance.post(`/users/login`, userData);
		toast.promise(res,{
			loading:"Logging in...",
			success:(res) => {
				return res?.data?.message || "Login successful 🎉"
			},
		})
		return (await res).data;	
	} catch (error) {
		toast.error(error?.response?.data?.message || "Login failed. Please try again.");
	}
})
export const userLogout = createAsyncThunk('/user/logout', async() => {
	try {
		const res = axiosInstance.post(`/users/logout`);
		toast.promise(res,{
			loading:"Logging out...",
			success:(res) => {
				return res?.data?.message || "Logout successful 🎉"
			},
			error:"Error in logging out"
		})
		return (await res).data;	
	} catch (error) {
		toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
	}
})

export const updateProfile = createAsyncThunk('/user/updateProfile', async({userId,formData}) => {
	
	try {
		const res = axiosInstance.put(`/users/updateProfile/${userId}`, formData);
		toast.promise(res,{
			loading:"Updating profile...",
			success:(res) => {
				return res?.data?.message || "Profile updated successfully "
			},
			error: "Profile update failed",

		})
		return (await res).data;	
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message || "Profile update failed. Please try again.");
	}
});

export const resetPassword = createAsyncThunk('/user/resetPassword', async({token,password,confirmPass}) => {
	try {
		const res = axiosInstance.post(`/users/reset-password/${token}`, {password,confirmPass});
		toast.promise(res,{
			loading:"Resetting password...",
			success:(res) => {
				return res?.data?.message || "Password reset successfully "
			},
			error: "Password reset failed",

		})		
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message || "Password reset failed. Please try again.");
	}
});

export const forgotPassword = createAsyncThunk('/user/forgotPassword', async({email}) => {	
	try {
		const res = axiosInstance.post(`/users/forgot-password`, {email});
		toast.promise(res,{
			loading:"Sending reset link...",
			success:(res) => {
				return res?.data?.message || "Reset link sent to your email "
			},
			error: "Failed to send reset link",

		})
		
		return (await res).data;
	} catch (error) { 
		toast.error(error?.response?.data?.message || "Failed to send reset link. Please try again.");
		return {success:false,message:error?.response?.data?.message}
	}
});

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
				
				if (action.payload?.success) {
					state.isLoggedIn = true;
					state.data = action.payload.data;
				} else {
					state.isLoggedIn = false;
					state.data = null;
				}

			})
			.addCase(userLogout.fulfilled, (state,action) => {
				state.isLoggedIn = false;
				state.data = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {	
				console.log(action.payload);
				
				state.data = action.payload.data;
			})
			
	}
})

export default authSlice.reducer