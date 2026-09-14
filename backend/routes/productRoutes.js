import express from "express";
import protect from "../middleware/authmiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import multer from "multer";
import { getProducts, getProductbyId, createProduct, updateProduct, deleteProduct } from "../controllers/productControllers.js";
const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// a user get access product and admin can create products

router.post("/", protect,admin,upload.single("imageUrl"), createProduct);
router.get("/",getProducts);

//  get product by id (user and admin) , modify and delete (by only admin) 

router.get("/:id",getProductbyId);
router.put("/:id", protect,admin,upload.single("imageUrl"), updateProduct);
router.delete("/:id", protect,admin,  deleteProduct);


export default router;