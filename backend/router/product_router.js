import express from 'express'
import { checkAllController } from '../controllers/product_controller/check_all_controller.js'

export const productRouter = express.Router()

productRouter.get("/check_all", checkAllController )