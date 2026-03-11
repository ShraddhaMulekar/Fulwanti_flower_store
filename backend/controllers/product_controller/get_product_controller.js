import { ProductModel } from "../../models/Product.js"

export const getProductController = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await ProductModel.findById({id})
        return res.status(200).json({
            message : "check your product!",
            status : true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message : "error in get product controller!",
            status : false,
            error
        })
    }
}