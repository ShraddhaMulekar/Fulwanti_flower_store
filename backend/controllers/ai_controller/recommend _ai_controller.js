import { recommendFlowers } from "../../services/ai_service.js";

export const recommendAiController = () => {
  try {
    const { occasion, budget, color } = req.body;

    const result = recommendFlowers(occasion, budget, color);

    return res.status(200).json({
      message: "AI recommendation!",
      status: true,
      recommendation: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error in recommendation ai controller!",
      status: false,
      error,
    });
  }
};
