
import ai from "../config/gemini.js";

export const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: message,
    });

    return res.status(200).json({
      success: true,
      reply: interaction.output_text,
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Mihy request failed.",
    });
  }
};

