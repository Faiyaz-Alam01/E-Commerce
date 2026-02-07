import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const addWishlist = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	// console.log(productId);
	
	const userId = req.user?._id;
	

	if (!productId) {
		throw new ApiError(400, "ProductId is required");
	}

	const product = await Product.findById(productId);
	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	const wishlist = await Wishlist.findOneAndUpdate(
		{ user: userId },
		{ $addToSet: { products: productId } },
		{ new: true, upsert: true }
	);

	return res.status(200).json(
		new ApiResponse(
		200,
		wishlist,
		"Added wishlist successfully"
		)
	);
});


export const deleteWhishlist = asyncHandler(async(req,res) => {
	const {productId} = req.params;
	const {_id:userId} = req.user;	
	
	if(!userId){
		throw new ApiError(401, "Unathorized user")
	}

	if(!productId){
		throw new ApiError(400, "ProductId is required")
	}


	const whishlist = await Wishlist.findOneAndUpdate(
		{user :userId},
		{$pull : {products :productId}},
		{new : true}
	);

	if (!whishlist) {
		throw new ApiError(404, "Wishlist not found for this user");
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			whishlist,
			"Product removed from wishlist",
		))
})

export const getAllWishlist = asyncHandler(async(req,res) => {
	const{ _id:userId } = req.user;
	
	const whishlist = await Wishlist.findOne({user:userId}).populate('products');

	if(!whishlist || whishlist.products.length === 0){
		throw  new ApiError(400, "No products in wishlist")
	}
	// console.log(whishlist);
	

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			whishlist,
			"fetched whishlist's products successfully"
		))
})