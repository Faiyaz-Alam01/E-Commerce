import { Router } from "express";
import { createOrder, RazorpayApiKey, verifyPayment,  } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/razorpay-key').get(verifyJWT,RazorpayApiKey);
router.route('/order').post(verifyJWT,createOrder);
router.route('/verify').post(verifyJWT,verifyPayment)

export default router;