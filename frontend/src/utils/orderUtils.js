import { Clock3 } from "lucide-react";
import { statusStyles } from "../constants/orderConstants";

function getStatus(status) {
  const key = String(status || "Confirmed").toLowerCase();

  return (
    statusStyles[key] || {
      label: status || "Processing",
      className: "bg-gray-100 text-gray-700 border-gray-200",
      icon: Clock3,
    }
  );
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(price) || 0);
}

function getOrderId(order) {
  return order._id || order.id || "";
}

function getProducts(order) {
  return Array.isArray(order.items) ? order.items : [];
}

function getOrderTotal(order) {
  return order.totalAmount ?? order.totalPrice ?? order.total ?? 0;
}

function getProductName(item) {
  return item.name || item.productId?.name || "Product";
}

function getProductImage(item) {
  return (
    item.imageUrl ||
    item.productId?.imageUrl ||
    item.product?.imageUrl ||
    ""
  );
}

export { getOrderId,getOrderTotal,getProductImage,getProductName,getProducts,getStatus,formatDate,formatPrice}