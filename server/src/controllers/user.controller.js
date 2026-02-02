import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/apiHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

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
				user: loggedInUser
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

const updateUser = asyncHandler(async(req, res) => {
	const {bio,username, email} = req.body;
	const id = req.params.id;
	console.log("id", id);
	
		
	const user = await User.findById(id);
	if(!user){
		throw new ApiError(404, "User not found");
	}		
	
	
	// const user = req.user._id;
	// console.log(user);

	// if(!user){
	// 	throw new ApiError(404, "User not found");
	// }

	// if([username, email, password, bio].some((field) => field?.trim() === "")){
	// 	throw new ApiError(400, "All fields are required");
	// };

	const avatarPath = req.file?.path;
	
	let avatarUrl
	if(avatarPath){
		const avatar = await uploadOnCloudinary(avatarPath);
		avatarUrl = avatar.secure_url;
		user.avatar = avatarUrl;
	}


	if(bio) user.bio =bio
	if(username) user.username = username;
	if(email) user.email = email;

	await user.save();

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{user},
			"User updated successfully"
		))

})

const forgotPassword = asyncHandler(async(req, res) => {
	const { email } = req.body;	
	console.log(email);
	

	const userExists = await User.findOne({ email });
	if(!userExists){
		throw new ApiError(404, 'Email not found');
	}

	const resetToken = await jwt.sign(
		{userId : userExists._id},
		process.env.JWT_SECRET, 
		{expiresIn: "10m"}
	);

	const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

	await sendEmail({
		to: userExists.email,
		subject: "Password Reset Request",
		html: `
		<p>Dear User,</p>

		<p>We received a request to reset the password associated with your account.</p>

		<p>Please click the button below to securely reset your password:</p>

		<p style="margin: 20px 0;">
			<a 
			href="${resetLink}" 
			style="
				background-color: #2563eb;
				color: #ffffff;
				padding: 10px 16px;
				text-decoration: none;
				border-radius: 4px;
				font-weight: 600;
				display: inline-block;
			">
			Reset Password
			</a>
		</p>

		<p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>

		<p>This password reset link will expire in <strong>15 minutes</strong> for security reasons.</p>

		<p>Regards,<br/>
		<strong>Support Team</strong></p>

		<p style="font-size:12px;color:#6b7280;">
			This is an automated email. Please do not reply.
		</p>
		`

	});

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{},
			"Password reset link sent to your email"
		));

});

const resetPassword =asyncHandler(async(req, res) => {
	const{password,confirmPass} = req.body;
	const {token} = req.params;

	if(!password || !confirmPass){
		throw new ApiError(400, "All fields are required");
	}

	if(password !== confirmPass){
		throw new ApiError(400, "Passwords do not match");
	}

	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	if(!decoded){
		throw new ApiError(400, "Invalid or expired token");
	}

	const user = await User.findById(decoded.userId);
	if(!user){
		throw new ApiError(404, "User not found");
	}

	user.password = password;
	await user.save();

	return res
		.status(200)
		.json(new ApiResponse(
			200,
			{},
			"Password reset successfully"
	));
});

const allUser = asyncHandler(async(req, res) => {
	const user = await User.find();
	return res
		.status(200)
		.json(new ApiResponse(
			200,
			user,
			"All users fetched successfully"
		));
})

const getUserById = asyncHandler(async(req, res) => {
	const {userId} = req.params;
	const user = await User.findById(userId).select("-password");
	if(!user){
		throw new ApiError(404, "User not found");
	}
	return res
		.status(200)
		.json(new ApiResponse(
			200,
			user,
			"User fetched successfully"
		));
})
export {registerUser, loginUser, logoutUser, updateUser, forgotPassword,resetPassword,allUser , getUserById};