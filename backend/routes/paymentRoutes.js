import express from "express";

import {
  createdOrder,
  verifyPayment,
} from "../controllers/paymentControllers.js";

import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createdOrder);

router.post("/verify-payment", protect, verifyPayment);

export default router;