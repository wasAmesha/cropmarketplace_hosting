import express from "express";
import { AddNewPayment, GetAllOrdersByDeliveryman, GetAllOrdersByFarmer, GetAllOrdersBySeller, UpdateStatus } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/addNewPayment", AddNewPayment);
router.get("/ordersBySeller/:id", GetAllOrdersBySeller);
router.get("/ordersByDeliveryman/:id", GetAllOrdersByDeliveryman);
router.get("/ordersByFarmer/:id", GetAllOrdersByFarmer);
router.put("/updateOrderStatus", UpdateStatus )

export default router;