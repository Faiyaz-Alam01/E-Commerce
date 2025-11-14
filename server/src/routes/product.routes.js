import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.js";

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

router.route('/All').get(getAllProducts);
router.route('/:productId').delete(deleteProduct);
router.route('/get/:productId').get(getProductById);
router.route('/update/:productId').put(upload.single("thumbnail"),updateProduct);

export default router