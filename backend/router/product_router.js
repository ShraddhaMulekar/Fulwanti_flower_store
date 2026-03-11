import express from 'express'
import { checkAllController } from '../controllers/product_controller/check_all_controller.js'
import { getProductController } from '../controllers/product_controller/get_product_controller.js'
import { createProductController } from '../controllers/product_controller/create_product_controller.js'
import { updateProductController } from '../controllers/product_controller/update_product_controller.js'
import { deleteProductController } from '../controllers/product_controller/delete_product_controller.js'

export const productRouter = express.Router()

productRouter.get("/check_all", checkAllController )
productRouter.get("/check_product/:id", getProductController )
productRouter.post("/create", createProductController )
productRouter.patch("/update/:id", updateProductController )
productRouter.delete("/delete/:id", deleteProductController )