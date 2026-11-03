
import express from "express";
import { downloadInvoice } from "../controllers/invoiceControllers.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Download invoice for a delivered order
router.get("/:orderId", protect, downloadInvoice);

export default router;

