import { ProductModel } from "../../models/Product.js"

export const checkAllController = async(req, res)=>{
    try {
        const allProduct = await ProductModel.find()

        return res.status(200).json({
            message : "check all products",
            status : true,
            allProduct
        })
    } catch (error) {
        return res.status(500).json({
            message : "server error in get product controller.",
            status : true,
            error
        })
    }
}