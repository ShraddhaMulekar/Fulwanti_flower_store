import express from "express"
import { createOrderController } from "../controllers/order_controller/create_order_controller.js"
import { getOrdersController } from "../controllers/order_controller/get_orders_controller.js"
import { protect } from "../middleware/authMiddleware.js"

export const orderRouter = express.Router()

orderRouter.post("/create", protect, createOrderController)
orderRouter.get("/check", protect, getOrdersController)