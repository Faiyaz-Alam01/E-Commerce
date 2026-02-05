import {Router} from "express"
import { addcategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router();



router.route('/add').post(addcategory);
router.route('/all-category').get(getAllCategory);
router.route('/update/:categoryId').put(updateCategory);
router.route('/get/:categoryId').get(showCategory);
router.route('/delete/:categoryId').delete(deleteCategory);

export default router;