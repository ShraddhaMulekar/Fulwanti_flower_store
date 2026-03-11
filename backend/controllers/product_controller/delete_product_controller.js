import { ProductModel } from "../../models/Product.js"

export const deleteProductController = async(req, res)=>{
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            message : "Producte Deleted Successful!",
            status : true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error in Deleted product controller!",
            status : false,
            error
        })
    }
}