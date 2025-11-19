import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { connectDb } from "./config/Database.js";

dotenv.config({
	path:'.env'
})

const app = express();
const PORT = process.env.PORT;

connectDb();

//corns
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.routes.js'
import categoryRoute from './routes/category.routes.js'
import whishlistRoute from './routes/whishlist.routes.js'

app.use("/api/v1/users", userRoute)
app.use("/api/v1/products", productRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/whishlist", whishlistRoute)

app.listen(PORT, () => {
	console.log(`server is running on the port ${PORT}`)
})