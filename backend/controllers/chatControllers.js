import ai, { extractProductFilters } from "../config/gemini.js";
import { searchProducts } from "./productControllers.js";

export const chatWithGemini = async (req, res) => {
try {
const { message } = req.body || {};


if (!message || typeof message !== "string" || !message.trim()) {
  return res.status(400).json({
    success: false,
    message: "Please provide a valid message.",
  });
}

// 1. Extract product-search filters from the user's message
const filters = await extractProductFilters(message);

// 2. Find actual products in MongoDB
const products = await searchProducts(filters);

// 3. Give Gemini the actual results so it can respond accurately
const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: `
    You are Mihy, the AI shopping assistant for iCart.

    User's message:
    ${message}

    Product search results from our database:
    ${JSON.stringify(
      products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        description: product.description,
        imageUrl: product.imageUrl,
        attributes: product.attributes,
        stock: product.stock,
      }))
    )}

    Instructions:
    - Recommend only products included in the database results.
    - Never invent products, prices, discounts, or specifications.
    - If matching products are found, briefly introduce them.
    - If no matching products are found, politely explain that
      no matching products were found and suggest broadening the search.
    - Keep the response friendly and concise.
  `,
});


return res.status(200).json({
  success: true,
  reply: interaction.output_text,
  products,
  filters,
});


} catch (error) {
console.error("Gemini error:", error);


return res.status(500).json({
  success: false,
  message: "Mihy request failed.",
});


}
};
