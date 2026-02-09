import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const addToCart = asyncHandler(async (req, res) => {

	const { productId, quantity = 1 } = req.body;
	const { _id: userId } = req.user;

	if (!productId) {
		throw new ApiError(400, "ProductId is required");
	}

	const product = await Product.findById(productId);
	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	let cart = await Cart.findOne({ user: userId });

	if (!cart) {
		cart = await Cart.create({
			user: userId,
			items: []
		});
	}

	const existingItem = cart.items.find(
		item => item.product.toString() === productId
	);

	if (existingItem) {
		existingItem.quantity += quantity;
	} else {
		cart.items.push({
			product: productId,
			quantity,
			price: product.price
		});
	}

	cart.totalPrice = cart.items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	await cart.save();

	return res.status(201).json(
		new ApiResponse(201, { cart }, "Product added to cart")
	);
});

export const getCart = asyncHandler(async(req, res) => {
	const userId = req.user._id;

	const cart = await Cart.findOne({user:userId}).populate('items.product');

	const cartData = cart? cart : {items:[], totalPrice:0};

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			cartData,
			cart? "Cart fetched successfully" : "cart is empty"
		))
})

export const removeItem = asyncHandler(async(req,res) => {
	const {productId} = req.params;
	const userId = req.user._id;
	
	if(!productId){
		throw new ApiError(400,'Required productId')
	};


	const cart = await Cart.findOneAndUpdate(
		{
			user: userId,
		},
		{
			$pull: {
				items : {product : productId}
			}
		},
		{new :true}
	)

	if(!cart){
		throw new ApiError(404, "Cart not found");
	}

	cart.totalPrice =cart.items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	await cart.save();

	return res.status(200).json(
		new ApiResponse(200, {  }, "Item removed from cart")
	);

})

export const updateCart = asyncHandler(async(req, res) => {
	
	const { quantity } = req.body;
	const {productId} = req.params;
	const userId = req.user._id;
	

	if(!productId || !quantity){
		throw new ApiError(400, 'product id required');
	}

	const cart = await Cart.findOneAndUpdate(
		{
			user : userId,
			"items.product":productId
		},
		{
			$set : {
				"items.$.quantity" : quantity
			}
		},{new:true}
	)

	if(!cart){
		throw new ApiError(404,"Cart or item not found");
	}

	cart.totalPrice = cart.items.reduce(
		(acc,item)=> acc + item.price * item.quantity,
		0
	);

	await cart.save();

	return res.status(200).json(
		new ApiResponse(
			200,
			cart,
			"Cart updated successfully"
		)
	);
})

export const clearCart = asyncHandler(async(req, res)=> {
	const userId = req.user._id;
	
	const cart = await Cart.findOneAndUpdate(
		{
			user:userId
		},
		{
			items : [],
			totalPrice:0
		}
		,
		{new : true}
	)

	if(!cart){
		throw new ApiError(404,"Cart not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			cart,
			"Cleaned all cart"
		))
})

export const checkoutCart = asyncHandler(async(req, res) => {
	const userId = req.user._id;

	const cart = await Cart.findOne({user : userId});

	if(!cart || cart.items.length === 0){
		throw new ApiError(400, 'Empty cart');
	}

	//create order
	const order = await Order.create ({
		user: userId,
		items:cart.items.map(item => ({
			product: item.product,
			quantity:item.quantity,
			price:item.price
		})),
		totalPrice:cart.totalPrice,
		status: "pending"
	})

	cart.items = [];
	cart.totalPrice = 0;
	await cart.save();

	return res.status(200).json(
		new ApiResponse(
			200,
			order,
			"Order placed successfully"
		)
	);

})