const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
	cart:[],
}


const cartSlice = createSlice({
	name:"cart",
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		builder
			.addCase()
	}
})

export default cartSlice.reducer;