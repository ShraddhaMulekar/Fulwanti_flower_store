import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    image: String,

    category: {
      type: String,
      enum: ["rose", "lily", "tulip", "bouquet"],
    },

    stock: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const ProductModel = mongoose.model("Product", ProductSchema )