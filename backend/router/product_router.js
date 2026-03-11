import express from 'express'
import { checkAllController } from '../controllers/product_controller/check_all_controller.js'
import { getProductController } from '../controllers/product_controller/get_product_controller.js'
import { createProductController } from '../controllers/product_controller/create_product_controller.js'
import { updateProductController } from '../controllers/product_controller/update_product_controller.js'

export const productRouter = express.Router()

productRouter.get("/check_all", checkAllController )
productRouter.get("/check_product", getProductController )
productRouter.post("/create", createProductController )
productRouter.patch("/update", updateProductController )