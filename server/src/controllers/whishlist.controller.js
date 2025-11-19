import { Product } from "../models/product.model.js";
import { Whishlist } from "../models/whishlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const addWhishlist = asyncHandler(async(req, res) => {
	const {productId} = req.params;
	const {_id : userId} = req.user;

	if(!userId){
		throw new ApiError(401, "Unauthorized user");
	}

	if(!productId){
		throw new ApiError(400, "ProductId is required")
	}

	let whishlist = await Whishlist.findOne({user : userId});
	if(!whishlist){
		whishlist = new Whishlist({
			user: userId,
			products : []
		})
	}

	if (whishlist.products.includes(productId)) {
		throw new ApiError(400, "Product already in wishlist");
	}

	whishlist.products.push(productId);
	await whishlist.save();

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			whishlist,
			"Added whishlist successfully"
		))

})

export const deleteWhishlist = asyncHandler(async(req,res) => {
	const {productId} = req.params;
	const userId = req.user._id;	
	
	if(!userId){
		throw new ApiError(401, "Unathorized user")
	}

	if(!productId){
		throw new ApiError(400, "ProductId is required")
	}

	const whishlist = await Whishlist.findOneAndUpdate(
		{user :userId},
		{$pull : {products :new mongoose.Types.ObjectId(productId)}},
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

export const getAllWhishlist = asyncHandler(async(req,res) => {
	
	const whishlist = await Whishlist.findOne({user : req.user._id}).populate('products');
	if(!whishlist || whishlist.products.length === 0){
		throw  new ApiError(400, "No products in wishlist")
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			whishlist,
			"fetched whishlist's products successfully"
		))
})