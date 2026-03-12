import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const paymentController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const payment = await razorpay.orders.create(options);

    return res.status(200).json({
      message: "payment successful!",
      status: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in payment controller!",
      status: false,
      error,
    });
  }
};
