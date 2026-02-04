import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
		minlength:10,
		trim: true,
	},
	thumbnail: {
		type: String,
		required: true
	},
	price: {
		type : Number,
		required: true,
		min: 0,
	},
	category : {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		default: "Generic"
	},
	images :[
		{
			type: String,
		}
	],
	created : {
		type : mongoose.Schema.Types.ObjectId,
		ref:"User"
	}

}, {timestamps: true})

export const Product = mongoose.model("Product", productSchema)
