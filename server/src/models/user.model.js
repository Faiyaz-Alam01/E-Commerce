import mongoose, { Schema } from "mongoose"; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		index: true
	},
	fullName: {
		type: String,
		lowercase:true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	avatar: {
		type: String, 
	},
	coverImage: {
		type:String,
	},
	password : {
		type: String,
		minlength:6,
    	required: true,
	},
	bio:{
		type: String,	
		maxlength: 250,
	},
	role: {
		type: String,
		enum:['user', 'admin'],
		default:"user"
	},
	watchHistory: [
		{
			video : {type:Schema.Types.ObjectId, ref:"Video"},
			watchedAt: {type: Date, default:Date.now}
		}
	],
	refreshToken: {
		type: String,
	},
	addresses : [
		{
			type: Schema.Types.ObjectId,
			ref:"Address"
		}
	]
	
}, {timestamps: true})

//create index
// userSchema.index({name:1});

//hash password before saving
userSchema.pre("save", async function(next){
	if(!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
})

//compare password
userSchema.methods.isCorrectPassword = async function(password) {
	return await bcrypt.compare(password,this.password);
}

//generate access token
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id : this._id,
			username: this.username,
			email:this.email,
			fullName:this.fullName,
			role:this.role
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn:process.env.ACCESS_TOKEN_EXPIRY
		}
	)
}

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id : this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn:process.env.REFRESH_TOKEN_EXPIRY
		}
	)
}

export const User = mongoose.model("User", userSchema);
