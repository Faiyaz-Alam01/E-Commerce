import mongoose from "mongoose";

export const connectDb = async() => {
	const url = process.env.MongoDB_URL;
	try {
		await mongoose.connect(url)
		console.log('DB connected successfully');
	} catch (error) {
		console.error("DB connection failed", error.message);
		process.exit(1);
	}
}
