import mongoose from "mongoose"

export const mongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected successfully!")
    } catch (error) {
        console.log("mongo db error", error)
    }
}