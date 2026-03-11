import express from "express"
import { createOrderController } from "../controllers/order_controller/create_order_controller.js"
import { getOrdersController } from "../controllers/order_controller/get_orders_controller.js"

export const orderRouter = express.Router()

orderRouter.post("/create", createOrderController)
orderRouter.get("/check", getOrdersController)