import {Router} from "express"
import { addWhishlist, deleteWhishlist, getAllWhishlist } from "../controllers/whishlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/add/:productId').post(verifyJWT,addWhishlist)
router.route('/delete/:productId').delete(verifyJWT,deleteWhishlist)
router.route('/getAll').get(getAllWhishlist);

export default router