import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { mongoDb } from "./config/mongoDB.js"
import { authRouter } from "./router/auth_router.js"
import { productRouter } from "./router/product_router.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)
app.use("/product", productRouter)

app.listen(port, async()=>{
    await mongoDb()
    console.log(`server running on http://localhost:${port}`)
})