import express from "express"
import { createRazorpayOrderController, verifyAndCreateOrderController } from "../controllers/payment_controller/payment_controller.js"
import { protect } from "../middleware/authMiddleware.js"

export const paymentRouter = express.Router()

paymentRouter.post("/create-order", protect, createRazorpayOrderController)
paymentRouter.post("/verify-and-create-order", protect, verifyAndCreateOrderController)