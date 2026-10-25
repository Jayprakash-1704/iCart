import User from "../models/user.models.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";

const getAnalytics = async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      recentOrders,
      totalProducts,
      confirmedOrders,
      shippedOrders,
      packedOrders,
      refundedOrders,
      deliveredOrders,
      cancelledOrders,
      outOfStockProducts,
      lowStockProducts,
      orders,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),

      Order.countDocuments({}),

      Order.find() .sort({ createdAt: -1 }).limit(5).populate("user", "fullName email") .populate("items", "name price imageUrl") .lean(),
        



    Product.countDocuments({}),

      Order.countDocuments({ status: "Confirmed" }),

      Order.countDocuments({ status: "Shipped" }),

      Order.countDocuments({ status: "Packed" }),

      Order.countDocuments({ status: "Refunded" }),

      Order.countDocuments({ status: "Delivered" }),

      Order.countDocuments({ status: "Cancelled" }),

      Product.countDocuments({ stock: 0 }),

      Product.countDocuments({
        stock: { $gt: 0, $lte: 5 },
      }),

      Order.find({}).select("totalAmount"),
    ]);

// Calculate revenue
const totalRevenue = orders.reduce(
  (acc, order) => acc + (Number(order.totalAmount) || 0),
  0
);

// Calculate average order value
const averageOrderValue =
  orders.length > 0 ? totalRevenue / orders.length : 0;

res.status(200).json({
  totalUsers,
  totalOrders,
  recentOrders,
  totalProducts,
  totalRevenue,
  averageOrderValue,
  refundedOrders,
  shippedOrders,
  packedOrders,
  confirmedOrders,
  deliveredOrders,
  cancelledOrders,
  outOfStockProducts,
  lowStockProducts,
});
  } catch (error) {
  console.error("Analytics error:", error);

  res.status(500).json({
    message: "Failed to fetch analytics",
  });
}
};

export default getAnalytics;