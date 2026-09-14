import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authControllers.js";
import protect from "../middleware/authmiddleware.js";
import admin from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users",protect,admin,getUser);

export default router;