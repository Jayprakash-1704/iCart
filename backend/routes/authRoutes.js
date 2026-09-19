import express from "express";
import { registerUser, loginUser, getUser,verifyEmail } from "../controllers/authControllers.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users",protect,admin,getUser);
router.post("/verify-email", verifyEmail);

export default router;