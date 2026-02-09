import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
	code : {
		type: String,
		required: true,
		unique: true,
		uppercase: true,
		trim:true
	},
	discountType: {
		type: String,
		enum:["percent", 'flat'],
		required: true,
	},
	discountValue:{
		type: Number,
		required: true,
	},
	minAmount: {
		type: Number,
		default: 0
	},
	expiryDate: {
		type: Date,
		required: true,
	},
	isActive:{
		type: Boolean,
		default: true
	},

},{timestamps: true})

const Coupon = mongoose.model("Coupon", couponSchema)
export default Coupon