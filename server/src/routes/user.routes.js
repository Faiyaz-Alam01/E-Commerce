import { Router } from "express";
import { loginUser, registerUser,logoutUser, updateUser, forgotPassword, resetPassword, allUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/isAuthenticate.js";

const router = Router();

router.route('/register').post(registerUser)

router.route('/get-all').get(verifyJWT,isAdmin,allUser)
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/forgot-password').post(forgotPassword);
router.route('/updateProfile/:id').put(upload.single('avatar'), updateUser)
router.route('/reset-password/:token').post(resetPassword)


export default router;