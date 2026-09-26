import  User from "../models/user.models.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";


const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({role:'user'});
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});


        const orders=await Order.find({})

        const totalRevenueData= orders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.json({ totalUsers,
             totalOrders, 
             totalProducts,
             totalRevenue: totalRevenueData
             });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
};

export default getAnalytics;