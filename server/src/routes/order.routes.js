import { Router } from "express";
const router = Router();

router.get("/product", (req, res) => {
		res.json({ message: "Product order route" });
	
})

export default router;