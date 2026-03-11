import { OrderModel } from "../../models/Order.js"

export const createOrderController = async(req, res)=>{
    try {
        const order = await OrderModel.create({
            ...req.body,
            userId : req.user.id
        })

        return res.status(200).json({
            message : "Order created successful!",
            status : true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error in created order controller!",
            status : false,
            error
        })
    }
}