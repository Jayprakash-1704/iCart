import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity:
        {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }

    },
    paymentId: {
        type: String,

    },
    status: {
        type: String,
        enum: [
            'Confirmed',
            'Packed',
            'Shipped',
            'Delivered',
            'Cancelled',
            'Refunded'
        ],
        default: 'Confirmed',
    }

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);

export default Order;