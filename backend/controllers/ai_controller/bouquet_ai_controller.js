import { generateBouquet } from "../../services/ai_service.js";

export const bouquetAiController = (req, res) => {
  try {
    const { occasion, budget } = req.body;

    const result = generateBouquet(occasion, budget);

    return res.status(200).json({
      message: "AI Bouquet!",
      status: true,
      bouquet: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in AI Bouquet!",
      status: false,
      error,
    });
  }
};
