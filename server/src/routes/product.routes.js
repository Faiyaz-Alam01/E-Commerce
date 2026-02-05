import { Router } from "express";
import { addProduct, getAllProducts, getFilteredProducts, getProductById, updateProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/add').post(upload.fields([
	{
		name:"thumbnail",
		maxCount:1
	},
	{
		name : "images",
		maxCount:5
	}
]),addProduct)

router.route('/filters').get(verifyJWT, getFilteredProducts);
router.route('/all').get(getAllProducts);
router.route('/update/:productId').put(upload.single("thumbnail"),updateProduct);
router.route('/get/:productId').get(getProductById);

export default router