import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDb } from "./config/Database.js";
import Razorpay from "razorpay";

dotenv.config({
	path:'.env'
})

const app = express();
const PORT = process.env.PORT;

connectDb();

//corns
app.use(cors({
	origin:'http://localhost:5173',
	credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//razorpay config
export const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_SECRET
})


//routes
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.routes.js'
import categoryRoute from './routes/category.routes.js'
import wishlistRoute from './routes/wishlist.routes.js'
import cartRoute from './routes/cart.routes.js'
import couponRoute from './routes/coupon.routes.js'
import paymentRoute from './routes/payment.route.js'

app.use("/api/v1/users", userRoute)
app.use("/api/v1/products", productRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/wishlist", wishlistRoute)
app.use("/api/v1/razorpay", paymentRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/coupon", couponRoute)


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

app.listen(PORT, () => {
	console.log(`server is running on the port ${PORT}`)
})