import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async(userid) => {
	try {
		const user = await User.findById(userid);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken
		await user.save({validateBeforeSave:false});

		return {accessToken, refreshToken};
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating refresh and access token")
	}
}

const registerUser = asyncHandler(async (req, res) => {
	const {username, email, password, role} = req.body

	if([username,email,password, role].some((field)=>
		field?.trim() === "")
	){
		throw new ApiError(400,"All fields are required");
	}

	if(password.length < 6){
		throw new ApiError(400, "Password must be at least 6 characters long")
	}	
	
	const userExists = await User.findOne({
		$or: [{username}, {email}]
	})

	if(userExists){
		throw new ApiError(401, "User already exists")
	}

	// console.log(req.files);
	
	// const avatarPath = req.files?.avatar?.[0]?.path;
	// console.log("avatarPath", avatarPath);
	
	// if(!avatarPath){
	// 	throw new ApiError(400,"Avatar path is required")
	// }

	// const avatar = await uploadOnCloudinary(avatarPath);
	// console.log("avatar", avatar);
	

	// if(!avatar){
	// 	throw new ApiError(500, "Failed to upload avatar")
	// }

	// const coverImage = await uploadOnCloudinary(coverImagePath);

	// if(!coverImage){
	// 	throw new ApiError(500, "Failed to upload avatar")
	// }

	const user = await User.create({
		username,
		role,
		email,
		password,
		// avatar:avatar.secure_url,
	})
	

	const createdUser = await User.findById(user._id).select("-password -refreshToken")
	if(!createdUser){
		throw new ApiError(500, "Something went wrong while registering the user")
	}

	return res
		.status(201)
		.json(new ApiResponse(
			201,
			createdUser,
			"user registered successfully"
		))


})

const loginUser = asyncHandler(async(req, res) => {
	const {email, password} = req.body

	if([email,password].some(field => field?.trim() === '')){
		throw new ApiError(400, "all fields are required");
	}

	const user = await User.findOne({email})

	if(!user){
		throw new ApiError(40, "user doesn't exist. please register")
	}

	const isValidePassword = await user.isCorrectPassword(password);
	if(!isValidePassword){
		throw new ApiError(400, "Invalid user credentials");
	}

	const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

	const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

	const options = {
		httpOnly : true,
		secure: true
	}

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(
			200,
			{
				user : loggedInUser, accessToken
			},
			"User logged In successfully"
		))

})

const logoutUser = asyncHandler(async(req, res) => {
	const userId = req.user._id;
	
	await User.findByIdAndUpdate(
		userId,
		{
			$unset: {refreshToken : 1}
		},
		{
			new: true,
		}
	)

	const options = {
		httpOnly: true,
		// secure: true
		secure: process.env.NODE_ENV === "production"

	}

	return res
		.status(200)
		.clearCookie("accessToken",options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(
			200,
			{},
			"Logout successfully"
		))

})
export {registerUser, loginUser, logoutUser}