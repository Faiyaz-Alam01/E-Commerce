import { Router } from "express";
import { applyCoupon, createCoupon } from "../controllers/coupon.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAuthenticate.js";

const router = Router();

router.route('/create').post(verifyJWT, isAdmin ,createCoupon)
router.route('/apply-coupon').post(verifyJWT,applyCoupon)

export default router;