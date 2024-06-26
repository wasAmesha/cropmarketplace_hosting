import express from "express";
import { AddToCart, DeleteCartById, GetCartByUser, UpdateCartById } from "../controllers/cartController.js";
const router = express.Router();

router.post("/addToCart", AddToCart);
router.get("/getUserCart/:userId", GetCartByUser);
router.put("/updateCart", UpdateCartById );
router.delete("/deleteCart/:id", DeleteCartById)

export default router;
