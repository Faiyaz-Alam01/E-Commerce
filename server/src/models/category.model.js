import mongoose, { Schema } from "mongoose"; 

const categorySchema = new Schema({
	name : {
		type : String,
		required : true,
		trim: true
	},
	slug : {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	image :{
		url: String,
		public_Id: String,
	}
},{timestamps: true})

export const Category = mongoose.model("Category",categorySchema);