import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref:'User',
		required:true
	},  
	label: { 
		type: String, 
		enum: ["home", "work", "other"], 
		default: "home" 
	},
	houseNo: String,
	city: String,
	state: String,
	country: { type: String, default: "India" },
	pincode: String
},{timestamps:true})

export const Address = mongoose.model("Address", addressSchema);