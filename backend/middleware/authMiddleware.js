import jwt from "jsonwebtoken"

export const protect = (req, res, next)=>{
    const authHeader = req.headers?.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

    if(!token){
        return res.status(401).json({message:"Please Log in!", status:false})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", status:false })
    }

}