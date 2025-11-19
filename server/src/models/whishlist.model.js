import mongoose,{Schema} from "mongoose"

const whishlistSchema = new Schema({
	user : {
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		required : true
	},
	products : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Product"
		}
	]

}, {timestamps: true})

export const Whishlist = mongoose.model("Whishlist", whishlistSchema);
