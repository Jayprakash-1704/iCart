import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        
    },
    numReviews: {
        type: Number,
        default: 0
    }

})

const Product = mongoose.model("Product", productSchema);
export default Product;