import {Router} from 'express';
import { addToCart, checkoutCart, clearCart, getCart, removeItem, updateCart } from '../controllers/cart.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
const router = Router();

router.route('/')
	.post(verifyJWT, addToCart)
	.get(verifyJWT,getCart)
	.delete(verifyJWT,clearCart)

router.route('/:productId')
	.put(verifyJWT, updateCart)
	.delete(verifyJWT, removeItem)

router.route('/checkout')
	.post(verifyJWT,checkoutCart)

export default router;