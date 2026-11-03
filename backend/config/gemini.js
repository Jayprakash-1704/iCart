import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});


export const extractProductFilters = (message) => {
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("A valid message is required.");
  }

  const text = message.toLowerCase();

  const filters = {
    keywords: [],
    category: null,
    subCategory: null,
    minPrice: null,
    maxPrice: null,
    attributes: {},
  };

  // Extract maximum price
  const maxPriceMatch = text.match(
    /(?:under|below|less than|upto|up to|max(?:imum)?)\s*₹?\s*([\d,]+)/i
  );

  if (maxPriceMatch) {
    filters.maxPrice = Number(
      maxPriceMatch[1].replace(/,/g, "")
    );
  }

  // Extract minimum price
  const minPriceMatch = text.match(
    /(?:above|over|more than|min(?:imum)?)\s*₹?\s*([\d,]+)/i
  );

  if (minPriceMatch) {
    filters.minPrice = Number(
      minPriceMatch[1].replace(/,/g, "")
    );
  }

  // Extract category and subcategory
  const categories = {
    electronics: {
      mobiles: ["mobile", "mobiles", "phone", "phones", "smartphone"],
      laptops: ["laptop", "laptops"],
      headphones: ["headphones", "earphones", "earbuds"],
      cameras: ["camera", "cameras"],
      televisions: ["television", "televisions"],
      "computer-accessories": ["keyboard", "mouse"],
      "home-appliances": ["fan", "refrigerator", "washing machine"],
    },
    fashion: {
      men: ["men's clothing", "menswear"],
      women: ["women's clothing", "womenswear"],
      kids: ["kids clothing", "children's clothing"],
      shoes: ["shoes", "sneakers", "footwear"],
      watches: ["watch", "watches"],
      bags: ["bag", "bags", "backpack"],
      jewellery: ["jewellery", "jewelry"],
    },
    beauty: {
      makeup: ["makeup", "lipstick", "mascara"],
      haircare: ["haircare", "shampoo", "conditioner"],
    },
    "home-kitchen": {
      furniture: ["furniture", "sofa", "chair"],
      cookware: ["cookware", "cooking pan"],
      "home-decor": ["home decor", "decoration"],
    },
  };

  for (const [category, subcategories] of Object.entries(categories)) {
    for (const [subCategory, words] of Object.entries(subcategories)) {
      if (words.some((word) => text.includes(word))) {
        filters.category = category;
        filters.subCategory = subCategory;
        break;
      }
    }

    if (filters.category) break;
  }

  // Extract supported brand names
  const brands = [
    "samsung", "apple", "iphone", "dell", "hp",
    "lenovo", "asus", "acer", "sony", "lg",
    "boat", "crompton",
  ];

  const brand = brands.find((name) => text.includes(name));

  if (brand) {
    filters.attributes.brand = brand;
  }

  return filters;
};





export default ai;
