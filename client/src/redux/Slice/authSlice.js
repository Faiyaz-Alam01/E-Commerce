import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name:"auth",
	initialState:{
		data:null,
		isLoggedIn:false,
	},
	reducers:{
		setUser :(state, action)=> {
			state.isLoggedIn= true,
			state.data = action.payload;
		},
		logout:(state)=>{
			state.isLoggedIn = false;
			state.data = null;
		}	
	}
})

export const {setUser} = authSlice.actions
export default authSlice.reducer