import express from "express";
import { AddNewProduct, DeleteProduct, GetAllProducts, UpdateProduct, getProductByCategory } from "../controllers/productController.js";
const router = express.Router();

router.get('/getProduct/:category', getProductByCategory)
router.get("/getAllProducts", GetAllProducts);
router.post("/addNewPost", AddNewProduct);
router.put("/updateProduct/:id", UpdateProduct);
router.delete("/deleteProduct/:id", DeleteProduct);

export default router;