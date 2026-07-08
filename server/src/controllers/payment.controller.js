import Razorpay from "razorpay";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { razorpay } from "../index.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import Order from "../models/order.model.js";

export const RazorpayApiKey = asyncHandler((req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{key: process.env.RAZORPAY_KEY_ID},
			"Razorpay API key fetched successfully"
		))
})

export const createOrder = asyncHandler(async (req, res) => {
	const { amount } = req.body;
	const userId = req.user.id;
	console.log(amount);
	

	const user = await User.findById(userId);
	if(!user){
		throw new ApiError(401, "Unauthorized user, please login");
	}
	
	if(user.role === "ADMIN"){
		throw new ApiError(401,"Admin can't purchase a subscription")
	}

	const options = {
		amount: amount * 100, // amount in paise
		currency: "INR",
	};

	const razorpayOrder = await razorpay.orders.create(options);
	
	const newOrder = new Order({
		user: userId,
		items: [{ product: null, quantity: 1, price: amount }],
		totalPrice: amount,
		razorpay_order_id: razorpayOrder.id,
		orderStatus: 'pending',
		paymentStatus: "pending",
	});

	await newOrder.save();
	
	
	
	return res
		.status(200)
		.json(new ApiResponse(
			200,
			newOrder,
			"Razorpay order created successfully"
		))
})

export const verifyPayment = asyncHandler(async(req, res) => {
	const userId = req.user.id;
	const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

	const user = await User.findById(userId);
	if(!user){
		throw new ApiError(401, "Unauthorized user, please login");
	}
	
	const order = await Order.findOne({
		 razorpay_order_id: razorpay_order_id 
	});
	if(!order){
		throw new ApiError(404, "Order not found");
	}
	
	console.log(order);
	

	const generated_signature = crypto
		.createHmac("sha256", process.env.RAZORPAY_SECRET)
		.update(`${razorpay_order_id}|${razorpay_payment_id}`)
		.digest('hex');
	
	if(generated_signature !== razorpay_signature) {
		throw new ApiError(400, "Payment verification failed, please try again");
	}

	order.paymentStatus = "paid";
	order.orderStatus = "confirmed";
	await order.save();

	await Payment.create({
		user: userId,
		order: order._id,
		razorpay_payment_id,
		razorpay_signature,
		Status: "success"
	})

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			order,
			"Payment verified successfully"
		))		

})

export const cancelOrder = asyncHandler(async(req, res) => {
	// TODO: implement order cancellation logic here
})

export const getMyOrders = asyncHandler(async(req, res) => {
	// TODO: implement logic to fetch user's orders here
});
