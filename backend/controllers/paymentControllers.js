import { Cashfree, CFEnvironment } from "cashfree-pg";
import dotenv from "dotenv";
import crypto from "crypto";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
dotenv.config();

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

// Create Cashfree order
const createdOrder = async (req, res) => {
  try {
    const { amount, customer } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    if (
      !customer?.customerId ||
      !customer?.customerPhone
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer ID and phone are required",
      });
    }

    const orderId = `icart_${crypto.randomUUID().replace(/-/g, "")}`;

    const request = {
      order_amount: Number(amount),
      order_currency: "INR",
      order_id: orderId,

      customer_details: {
        customer_id: String(customer.customerId),
        customer_phone: String(customer.customerPhone),
        ...(customer.customerEmail
          ? { customer_email: customer.customerEmail }
          : {}),
      },

      order_meta: {
        return_url:
          `${process.env.FRONTEND_URL}/payment-status?order_id=${orderId}`,
      },
    };

    const response = await cashfree.PGCreateOrder(request);

    return res.status(200).json({
      success: true,
      orderId: response.data.order_id,
      paymentSessionId: response.data.payment_session_id,
      orderStatus: response.data.order_status,
    });
  } catch (error) {
    console.error(
      "Cashfree order creation error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
};

// Verify Cashfree order status
const verifyPayment = async (req, res) => {
  try {
    const { orderId, items, address, delivery } = req.body;

    console.log("========== PAYMENT VERIFICATION ==========");
    console.log("Order ID:", orderId);
    console.log("User ID:", req.user?._id);

    // 1. Validate request
    if (
      !orderId ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Order ID, items, and address are required",
      });
    }

    // 2. Fetch order from Cashfree
    const response = await cashfree.PGFetchOrder(orderId);
    const cashfreeOrder = response.data;

    console.log("Cashfree order status:", cashfreeOrder.order_status);
    console.log("Cashfree amount:", cashfreeOrder.order_amount);

    // 3. Verify payment
    if (cashfreeOrder.order_status !== "PAID") {
      return res.status(400).json({
        success: false,
        message: "Payment has not been confirmed by Cashfree",
        orderStatus: cashfreeOrder.order_status,
      });
    }

    // 4. Prevent duplicate orders
    const existingOrder = await Order.findOne({
      cashfreeOrderId: orderId,
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already created",
        order: existingOrder,
      });
    }

    // 5. Fetch trusted product details
    const orderItems = await Promise.all(
      items.map(async (item) => {
        if (
          !item.productId ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          throw new Error("Invalid product ID or quantity");
        }
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
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

    // 6. Calculate subtotal using database prices
    const subtotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log("Calculated product subtotal:", subtotal);
    const shipping = delivery === "express" ? 49 : 0;

    // Calculate the discount on the backend
    // This example assumes ICART1000 was validated by the backend.
    const discount = req.body.couponApplied
      ? Math.min(1000, subtotal + shipping)
      : 0;

    // Calculate the expected final total
    const expectedTotal = Math.max(
      0,
      subtotal + shipping - discount
    );

    if (
      Math.abs(Number(cashfreeOrder.order_amount) - expectedTotal) > 0.01
    ) {
      console.error("Amount mismatch:", {
        cashfreeAmount: cashfreeOrder.order_amount,
        calculatedTotal: expectedTotal,
      });

      return res.status(400).json({
        success: false,
        message: "Payment amount does not match the product subtotal",
        cashfreeAmount: cashfreeOrder.order_amount,
        calculatedTotal: expectedTotal,
      });
    }

    // 7. Map address fields to your Order schema
    const orderAddress = {
      ...address,
      postalCode: address.postalCode || address.pinCode,
      country: address.country || "India",
    };

    // 8. Save order in MongoDB
    const savedOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: Number(cashfreeOrder.order_amount),
      address: orderAddress,
      paymentId: orderId,
      cashfreeOrderId: orderId,
      status: "Confirmed",
    });

    console.log("Order saved successfully:", savedOrder._id);
    console.log("==========================================");

    return res.status(201).json({
      success: true,
      message: "Payment successful and order saved",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify payment or save order",
      error: error.message,
    });
  }
};

export { createdOrder, verifyPayment };

