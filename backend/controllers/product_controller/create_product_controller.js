import { ProductModel } from "../../models/Product.js"

export const createProductController = async(req, res)=>{
    try {
        const product = await ProductModel.create(req.body)
        return res.status(200).json({
            message:"Product created successful!",
            status : true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:"error in create product controller!",
            status : false,
            error
        })
    }
}