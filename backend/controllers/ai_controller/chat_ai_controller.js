import { ProductModel } from "../../models/Product.js";

const pickOccasion = (q) => {
  if (q.includes("birthday")) return "birthday";
  if (q.includes("anniversary")) return "anniversary";
  if (q.includes("wedding")) return "wedding";
  if (q.includes("sorry")) return "apology";
  if (q.includes("congrat")) return "congratulations";
  return "";
};

const pickCategory = (q) => {
  if (q.includes("rose")) return "rose";
  if (q.includes("lily")) return "lily";
  if (q.includes("tulip")) return "tulip";
  if (q.includes("bouquet")) return "bouquet";
  return "";
};

const pickBudget = (text) => {
  const m = String(text).match(/(?:₹|rs\.?|inr)?\s*(\d{2,6})/i);
  return m ? Number(m[1]) : null;
};

const makeCareReply = (q) => {
  if (q.includes("rose")) {
    return "Rose care: trim stems diagonally, change water daily, remove leaves below waterline, keep in a cool spot. A pinch of sugar helps for longer freshness.";
  }
  if (q.includes("lily")) {
    return "Lily care: remove pollen (prevents stains), change water every 1–2 days, keep away from direct sun, and trim stems slightly when changing water.";
  }
  if (q.includes("tulip")) {
    return "Tulip care: use a tall vase, add cold water, keep away from heat, trim stems straight, and avoid mixing with daffodils in the same water.";
  }
  return "General care: trim stems 1–2 cm, change water daily, keep away from direct sun/heat, and remove wilted petals. Tell me the flower type for specific tips.";
};

const formatRecommendations = (products, budget, category, occasion) => {
  const lines = products.map(
    (p, idx) =>
      `${idx + 1}) ${p.name} — ₹${p.price} (${p.category}, stock ${p.stock})`,
  );
  const ctx = [
    occasion ? `Occasion: ${occasion}` : null,
    category ? `Category: ${category}` : null,
    budget ? `Budget: ₹${budget}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return `${ctx ? ctx + "\n" : ""}Top picks for you:\n${lines.join(
    "\n",
  )}\n\nWant me to recommend something cheaper or more premium?`;
};

export const chatAiController = async (req, res) => {
  try {
    const { message } = req.body || {};
    const text = String(message || "").trim();
    const q = text.toLowerCase();

    if (!text) {
      return res.status(400).json({
        message: "Message is required",
        status: false,
      });
    }

    // Care questions
    if (q.includes("care") || q.includes("fresh") || q.includes("keep")) {
      return res.status(200).json({
        message: "AI Chat!",
        status: true,
        reply: makeCareReply(q),
      });
    }

    const occasion = pickOccasion(q);
    const category = pickCategory(q);
    const budget = pickBudget(text);

    // If user asks for recommendation/suggestion, use DB to recommend.
    const wantsRecommend =
      q.includes("recommend") ||
      q.includes("suggest") ||
      q.includes("best") ||
      q.includes("gift") ||
      occasion ||
      Boolean(category) ||
      Boolean(budget);

    if (wantsRecommend) {
      const query = {};
      if (category) query.category = category;
      query.stock = { $gt: 0 };
      if (budget) query.price = { $lte: budget };

      const products = await ProductModel.find(query)
        .sort({ price: -1, stock: -1 })
        .limit(5);

      if (!products.length) {
        const hint = budget
          ? `I couldn't find in-stock items under ₹${budget}. Try increasing budget or remove the budget limit.`
          : "I couldn't find matching in-stock items. Try specifying category (rose/lily/tulip/bouquet) or a budget.";

        return res.status(200).json({
          message: "AI Chat!",
          status: true,
          reply: hint,
        });
      }

      return res.status(200).json({
        message: "AI Chat!",
        status: true,
        reply: formatRecommendations(products, budget, category, occasion),
      });
    }

    // Fallback: guide user to ask better question.
    return res.status(200).json({
      message: "AI Chat!",
      status: true,
      reply:
        `You asked: "${text}".\n` +
        "Tell me the occasion (birthday/anniversary/wedding), budget (₹), and preferred category (rose/lily/tulip/bouquet). I’ll suggest the best products from the store.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in AI Chat!",
      status: false,
      error: String(error?.message || error),
    });
  }
};
