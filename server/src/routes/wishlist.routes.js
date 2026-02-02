import {Router} from "express"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addWishlist, getAllWishlist ,deleteWhishlist} from "../controllers/wishlist.controller.js";
const router = Router();

router.route('/add/:productId').post(verifyJWT,addWishlist)
router.route('/delete/:productId').delete(verifyJWT,deleteWhishlist)
router.route('/getAll').get(verifyJWT,getAllWishlist);

export default router