import express from "express"
import { createOrderController } from "../controllers/order_controller/create_order_controller.js"

export const orderRouter = express.Router()

orderRouter.post("/create", createOrderController)