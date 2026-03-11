import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    totalPrice: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    deliveryOption: {
      type: String,
      enum: ["same-day", "next-day", "pickup"],
    },

    address: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const OrderModel = mongoose.model("Order", OrderSchema)