import express from "express"
import { paymentController } from "../controllers/payment_controller/payment_controller.js"
import { protect } from "../middleware/authMiddleware.js"

export const paymentRouter = express.Router()

paymentRouter.post("/create", protect, paymentController)