import Order from '../models/order.models.js'
import sendMail from '../utils/sendMail.js'
import Product from '../models/product.models.js'

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !address) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        // Fetch product details and validate the items
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.productId);

                if (!product) {
                    throw new Error(
                        `Product not found: ${item.productId}`
                    );
                }

                return {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                    imageUrl: product.imageUrl,
                };
            })
        );

        // Calculate the total on the server
        const calculatedTotal = orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalAmount: calculatedTotal,
            address,
            paymentId,
        });

        const savedOrder = await order.save();

        const message = `Dear ${req.user.fullName || req.user.name || "Customer"},

Thank you for your order! Your order has been successfully placed.

Order Details:
Order ID: ${savedOrder._id}
Total Amount: ₹${savedOrder.totalAmount}

We will notify you once your order is shipped.

Best regards,
iCart Team`;

        await sendMail(
            req.user.email,
            "Order Confirmation",
            message
        );

        return res.status(201).json({
            message: "Order created successfully",
            order: savedOrder,
        });
    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            message: "Error creating order",
            error: error.message,
        });
    }
};


//    =>>>>>>>>>>>>>>>>>>>   get all users by admin

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'fullName email').populate('items', 'name price imageUrl');
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error })
    }
}


//  get my orders =>>>>>>>> Users <<<<<<=


const myOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your orders fetched successfully",
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};




/// ==========>>>>>>>>>>>>>update order status by admin


const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).json({ message: `Order Status Updated : ${order.status}`, order })
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error })
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('user', 'fullName email').populate('items', 'name status price imageUrl'); 

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};







export { createOrder, getAllOrders, myOrders, updateOrderStatus, getOrderById }