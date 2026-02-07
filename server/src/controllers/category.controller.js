import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addcategory = asyncHandler(async(req, res) => {
	const {name, slug} = req.body;	

	if(!name|| !slug){
		throw new ApiError(400, "all fields are required");
	}

	const category = await Category.findOne({slug});
	if(category) {
		throw new ApiError(400, "slug should be unique");
	}
	
	let categoryImage;
	if(req.file){

		const result = await uploadOnCloudinary(req.file.path);
		if(!result){
			throw new ApiError(500, "Failed to upload image");
		}
		
		categoryImage = {
			url: result?.secure_url,
			public_Id: result?.public_id
		};
	}	

	const newcategory = await Category.create({
		name,
		slug, 
		image: categoryImage
	})

	return res
		.status(200)
		.json(new ApiResponse(
			201,
			newcategory,
			"Added category successfully"
		))

})

export const updateCategory = asyncHandler(async(req, res) => {
	const {name, slug} = req.body;
	const {categoryId} = req.params;

	const category = await Category.findByIdAndUpdate(
		categoryId,
		{
			name, slug
		},
		{
			new : true
		}
	)

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			category,
			"updated category successfully"
		))
	
}) 

export const showCategory = asyncHandler(async(req, res) => {
	const {categoryId} = req.params;

	const category = await Category.findById(categoryId);
	if(!category){
		throw new ApiError(400, "Not found category");
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			category,
			"fetched category successfully"
		))
})

export const getAllCategory = asyncHandler(async(req, res) => {
	const categories  = await Category.find().sort({createdAt:-1}).lean().exec()
	if(categories.length === 0){
		throw new ApiError(404, "No categories found")
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			categories,
			"fetched all category successfully"
		))
})

export const deleteCategory = asyncHandler(async(req, res) => {
	const {categoryId} = req.params;

	const category = await Category.findByIdAndDelete(categoryId);
	if (!category) {
		throw new ApiError(404, "Category not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			category,
			"Category Deleted successfully"
		))
})