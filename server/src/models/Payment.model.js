import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	order : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
		required: true	
	},
	razorpay_payment_id: {
		type: String,
		required: true
	},
	razorpay_signature: {
		type: String,
		required: true
	},
	Status:{
		type: String,
		required: true,
		default: "pending"
	}
},{timestamps:true});

export const Payment = mongoose.model("Payment", paymentSchema);