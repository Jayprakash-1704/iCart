import express from 'express'

import protect from "../middleware/authMiddleware.js";
import admin from '../middleware/adminMiddleware.js'
import { createOrder, getAllOrders, myOrders, updateOrderStatus } from '../controllers/orderControllers.js'

const router=express.Router()


router.post("/", protect, createOrder);
router.get("/", protect,admin, getAllOrders);
router.get("/my-orders", protect, myOrders);
router.put("/:id/status",protect,admin, updateOrderStatus);


export default router;