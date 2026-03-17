import Razorpay from "razorpay";
import crypto from "crypto";
import { OrderModel } from "../../models/Order.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrderController = async (req, res) => {
  try {
    const { amount } = req.body || {};
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      return res
        .status(400)
        .json({ message: "Valid amount is required", status: false });
    }

    const options = {
      amount: Math.round(amt * 100),
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      message: "Razorpay order created",
      status: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating Razorpay order",
      status: false,
      error: String(error?.message || error),
    });
  }
};

export const verifyAndCreateOrderController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      totalPrice,
      deliveryOption,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Razorpay payment fields are required",
        status: false,
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return res.status(500).json({
        message: "Razorpay secret missing on server",
        status: false,
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
        status: false,
      });
    }

    const orderDoc = await OrderModel.create({
      userId: req.user.id,
      products,
      totalPrice,
      paymentStatus: "paid",
      deliveryOption,
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
    });

    return res.status(200).json({
      message: "Payment verified & order created",
      status: true,
      order: orderDoc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying payment",
      status: false,
      error: String(error?.message || error),
    });
  }
};
