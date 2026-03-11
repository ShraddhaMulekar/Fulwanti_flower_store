import { ProductModel } from "../../models/Product.js"

export const updateProductController = async(req, res)=>{
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )

        return res.status(200).json({
            message : "Product updated successful!",
            status : true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error in update product controller!",
            status : false,
            error
        })
    }
}