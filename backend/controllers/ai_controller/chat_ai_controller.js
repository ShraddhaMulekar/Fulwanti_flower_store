export const chatAiController = (req, res) => {
  try {
    const { message } = req.body;

    return res.status(200).json({
      message: "AI Chat!",
      status: true,
      reply: "Hello! How can I help with flowers today?",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in AI Chat!",
      status: false,
      error,
    });
  }
};
