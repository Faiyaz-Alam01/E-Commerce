import Coupon from "../models/coupon.model.js";
import Cart from '../models/cart.model.js'
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createCoupon = asyncHandler(async(req, res) => {
	const {code,discountType,discountValue,minAmount, expiryDate } = req.body;

	if(!code || !discountType || !discountValue || !minAmount ||!expiryDate){
		throw new ApiError(400, "All fields are required")
	}

	if(!["percent", "flat"].includes(discountType))	{
		throw new ApiError(400, "Invalide discount type. must be 'percent' or 'flat'")
	}
	if(discountValue < 0 ){
		throw new ApiError(400, "Discount value must be greater than 0")
	}

	if(minAmount < 0){
		throw new ApiError(400, "Minimum value can not be neggative")
	}

	//check duplicate 
	const existCoupon = await Coupon.findOne({
		code: code.toUpperCase()
	})
	if(existCoupon){
		throw new ApiError(400, "coupon already exist");
	}



	const coupon = await Coupon.create({
		code :code.toUpperCase(),
		discountType,
		discountValue,
		minAmount,
		expiryDate
	})


	return res
		.status(201)
		.json(new ApiResponse(
			200,
			coupon,
			"coupon created successfully"
		))
})

export const applyCoupon = asyncHandler(async(req, res) => {
	// console.log(req.body);
	
	const {code} = req.body;
	const userId = req.user._id;

	if(!code){
		throw new ApiError(400, "Inavlid code")
	}

	const coupon = await Coupon.findOne({
		code: code.toUpperCase(),
	})
	if(!coupon){
		throw new ApiError(400, 'invalid coupon')
	}

	if(coupon.expiryDate < new Date()){
		throw new ApiError(400, 'coupon expired')
	}

	const cart = await Cart.findOne({user: userId}).populate("items.product");
	if(!cart){
		throw new ApiError(400, 'cart not found');
	}

	const cartTotal = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

	if(cartTotal < coupon.minAmount){
		throw new ApiError(400, `Minimum order value should be ${coupon.minAmount}`);
	}

	let discountAmount = 0;
	if(coupon.discountType === 'percent'){
		discountAmount = (cartTotal * coupon.discountValue)/100;
	}else if(coupon.discountType === 'flat'){
		discountAmount = coupon.discountValue;
	}

	cart.totalPrice = cartTotal;
	cart.discount = discountAmount;
	cart.finalPrice  = (cartTotal - discountAmount);
    await cart.save();


	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{cart},
			"Applied coupon successfully"
		))
	
})