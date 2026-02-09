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
	status : {
		type: String,
		default:"pending"
	}
})

const Order = mongoose.model('Order', orderSchema);
export default Order