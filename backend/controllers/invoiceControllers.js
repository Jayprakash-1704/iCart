import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Order from "../models/order.models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadInvoice = async (req, res) => {
let browser;
let currentStep = "starting";

try {
const { orderId } = req.params;


// 1. Validate the order ID
currentStep = "validating order ID";

if (!mongoose.Types.ObjectId.isValid(orderId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid order ID.",
  });
}

// 2. Find the order
currentStep = "finding order";

const order = await Order.findById(orderId).populate(
  "user",
  "fullName email"
);

if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found.",
  });
}

// 3. Verify ownership
currentStep = "checking order ownership";

if (
  !req.user ||
  !order.user ||
  order.user._id.toString() !== req.user._id.toString()
) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to download this invoice.",
  });
}

// 4. Only allow delivered orders
currentStep = "checking order status";

if (String(order.status).toLowerCase() !== "delivered") {
  return res.status(400).json({
    success: false,
    message: "Invoice is available only for delivered orders.",
  });
}

// 5. Build product rows
currentStep = "preparing invoice items";

const items = order.items || [];

const itemsHtml = items
  .map((item, index) => {
    const name = escapeHtml(item.name || item.productId?.name || "Product");
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    const amount = price * quantity;

    return `
      <tr>
        <td>${index + 1}</td>
        <td class="product-name">${name}</td>
        <td class="text-right">${formatCurrency(price)}</td>
        <td class="text-right">${quantity}</td>
        <td class="text-right">${formatCurrency(amount)}</td>
      </tr>
    `;
  })
  .join("");

const subtotal = items.reduce(
  (total, item) =>
    total +
    (Number(item.price) || 0) * (Number(item.quantity) || 0),
  0
);

const totalAmount = Number(order.totalAmount) || subtotal;
const deliveryFee = Math.max(0, totalAmount - subtotal);

const address = order.address;

const deliveryAddress =
  typeof address === "string"
    ? address
    : [
        address?.street,
        address?.city,
        address?.state,
        address?.postalCode,
        address?.country,
      ]
        .filter(Boolean)
        .join(", ");

const invoiceData = {
  orderId: order._id.toString(),
  invoiceDate: new Date(
    order.createdAt || Date.now()
  ).toLocaleDateString("en-IN"),
  customerName: escapeHtml(order.user.fullName || "Customer"),
  customerEmail: escapeHtml(order.user.email || "Not provided"),
  deliveryAddress: escapeHtml(deliveryAddress || "Not provided"),
  paymentId: escapeHtml(order.paymentId || "Not provided"),
  orderStatus: escapeHtml(order.status || "Delivered"),
  itemsHtml,
  subtotal: formatCurrency(subtotal),
  deliveryFee: formatCurrency(deliveryFee),
  totalAmount: formatCurrency(totalAmount),
};

// 6. Read the HTML template
currentStep = "reading invoice HTML template";

const templatePath = path.join(
  __dirname,
  "../templates/invoice.html"
);

let html = await fs.readFile(templatePath, "utf8");

for (const [key, value] of Object.entries(invoiceData)) {
  html = html.replace(
    new RegExp(`{{${key}}}`, "g"),
    String(value)
  );
}

// 7. Launch Puppeteer
currentStep = "launching Puppeteer";

browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();

// 8. Render invoice HTML
currentStep = "rendering invoice HTML";

await page.setContent(html, {
  waitUntil: "load",
  timeout: 30000,
});

// 9. Generate PDF
currentStep = "generating PDF";

const pdfBuffer = await page.pdf({
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "12mm",
    right: "12mm",
    bottom: "12mm",
    left: "12mm",
  },
});

// 10. Send PDF to frontend
currentStep = "sending PDF";

res.setHeader("Content-Type", "application/pdf");
res.setHeader(
  "Content-Disposition",
  `attachment; filename="iCart-invoice-${order._id}.pdf"`
);

return res.send(pdfBuffer);


} catch (error) {
console.error(`Invoice failed while ${currentStep}:`, error);


if (!res.headersSent) {
  return res.status(500).json({
    success: false,
    message: "Unable to generate invoice.",
    error: error.message,
    step: currentStep,
  });
}


} finally {
if (browser) {
try {
await browser.close();
} catch (closeError) {
console.error("Failed to close Puppeteer browser:", closeError);
}
}
}
};

function formatCurrency(amount) {
return `Rs. ${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function escapeHtml(value) {
return String(value)
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, "")
.replace(/'/g, "'");
}
