import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
	user : {
		type: mongoose.Types.ObjectId,
		ref:"User"
	},
	items : [
		{
			product : {
				type: mongoose.Schema.ObjectId,
				ref:"Product"
			},
			quantity: Number,
			price:Number
		}
	],
	totolPrice : Number,
	razorpay_order_id : {
		type: String,
		required:true
	},
	orderStatus : {
		type: String,
		default:"pending"
	},
	paymentStatus : {
		type: String,
		default:"pending"
	}
},{timestamps:true}
);

const Order = mongoose.model('Order', orderSchema);
export default Order