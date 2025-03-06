import e from "express";
import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,UseUnifiedTopology:true})
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDB