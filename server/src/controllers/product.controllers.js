import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addProduct = asyncHandler(async(req,res) => {
	const {title, description,price, category, brand} = req.body;
	// console.log(req.body);
	
	if([title,description,category,brand].some((field) => field?.trim()==="")){
		throw new ApiError(400,"All fields are required");
	}

	if(!price){
		throw new ApiError(400, "Valid price is required");
	}


	const productExist = await Product.findOne({title})
	if(productExist){
		throw new ApiError(409,"Product title already exists")
	}

	const thumbnailPath = req.files?.thumbnail?.[0]?.path;
	if(!thumbnailPath){
		throw new ApiError(400,"thumbnailPath path is required")
	}

	const thumbnail = await uploadOnCloudinary(thumbnailPath);
	if(!thumbnail){
		throw new ApiError(500,"Failed to upload thumbnail")
	}

	const imagesPath = req.files?.images || [];
	// console.log("imagesPath", imagesPath);
	
	if(imagesPath.length === 0){
		throw new ApiError(400, "At least one image is required");
	}

	const images = [];
	for(const img of imagesPath){
		// console.log(img.path)
		const result = await uploadOnCloudinary(img?.path);
		if(!result){
			throw new ApiError(500, "Failed to upload one of the images")
		}
		images.push(result?.secure_url);
	}

	const product = await Product.create({
		title,
		description,
		price,
		category,
		brand,
		thumbnail:thumbnail?.secure_url,
		images
	})

	return res
		.status(201)
		.json(new ApiResponse(
			201,
			product,
			"Product created successfully",
		))

})

export const updateProduct = asyncHandler(async(req, res)=>{
	const {productId} = req.params;
	// console.log(req.params);
	// console.log(req.body);
	

	if(!productId){
		throw new ApiError(400,'ProductId is required');
	}

	const { title, description, category, brand, price } = req.body;

	const thumbnailPath = req.file?.path;
	const thumbnail = await uploadOnCloudinary(thumbnailPath);

	const product = await Product.findByIdAndUpdate(
		productId,
		{
			title,
			description,
			category,
			brand,
			thumbnail:thumbnail?.secure_url,
			price,
		},
		{
			new : true
		}
	)

	if(!product){
		throw new ApiError(404, "Product not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			product,
			"product updated successfully"
		))
	
})

export const getAllProducts = asyncHandler(async(req, res) => {
	const products = await Product.find();

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			products,
			products.length > 0 ? "fetched products successfully" : "No products found"
		))
})

export const getProductById = asyncHandler(async(req, res) => {
	const {productId} = req.params;	

	if(!productId){
		throw new ApiError(400, "ProductId is required");
	}

	const product = await Product.findById(productId);
	if(!product){
		throw new ApiError(404,"Not found product")
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			product,
			"fetched product successfully"
		))
})

export const deleteProduct = asyncHandler(async(req, res) => {
	const {productId} = req.params;
	
	const product = await Product.findById(productId);
	if(!product){
		throw new ApiError(404, "Not Product found");
	}

	// 
	// console.log(product);
	

	await Product.findByIdAndDelete(productId)

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{},
			"Products deleted successfully"
		))
})

export const getFilteredProducts = asyncHandler(async(req, res) => {
	const { search, category, brand, price } = req.query;
	// console.log("query received",req.query)
	
	const userId = req.user?._id;

	const user = await User.findById(userId);
	if(!user){
		throw new ApiError(404, "User not found");
	}

	let filter = {};
	if(search){
		filter.title = { $regex: search, $options: "i" };
	}

	if(category){
		filter.category = category;
	}

	if(brand){		
		filter.brand = brand;
	}

	if(price){
		filter.price = { $lte: Number(price) };
	}

	// console.log(filter);
	
	
	const products = await Product.find(filter);
	
	return res
		.status(200)
		.json(new ApiResponse(
			200,
			products,
			'Fetched filtered products successfully'
		))
	
});