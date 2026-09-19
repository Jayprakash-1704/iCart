import Order from '../models/order.models.js'
import sendMail from '../utils/sendMail.js'


const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId,
            })

            // console.log(req.user.email);

            const savedOrder = await order.save()

            // Send confirmation email

            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully placed.\n\nOrder Details:\nOrder ID: ${savedOrder._id}\nTotal Amount: ₹${savedOrder.totalAmount}\n\nWe will notify you once your order is shipped.\n\nBest regards,\niCart Team`;

            await sendMail(
                 req.user.email,
                'Order Confirmation',
                message
            )
            res.status(201).json({ message: 'Order created successfully', order: savedOrder })
        }


    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error })
    }
}


//    =>>>>>>>>>>>>>>>>>>>   get all users by admin

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('items.productId', 'name price')
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
            .populate("items.productId", "name price");

        res.status(200).json({ message: "Your Orders fetched Successfully", orders });

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



export { createOrder, getAllOrders, myOrders, updateOrderStatus }