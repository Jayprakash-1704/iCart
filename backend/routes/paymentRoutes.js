import express from 'express'
import protect from "../middleware/authMiddleware.js";
import admin from '../middleware/adminMiddleware.js'
import { createdOrder, verifyPayment } from '../config/razorpay.js'

const router=express.Router()

router.post("/order", protect, createdOrder);
router.post("/verify", protect, verifyPayment);

export default router;