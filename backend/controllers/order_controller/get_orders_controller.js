import { OrderModel } from "../../models/Order.js"

export const getOrdersController = async(req, res)=>{
    try {
        const order = await OrderModel.find({userId : req.user.id}).populate("products.productId")

        return res.status(200).json({
            message : "Check your Order!",
            status : true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error in order controller!",
            status : false,
            error
        })
    }
}