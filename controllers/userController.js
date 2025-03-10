import mongoose from "mongoose";
import UserModel from "../model/userModel.js";

class UserControl{
    static UserRegister = async(req,res)=>{
           try {
            const{userName,email,password,address,phone} = req.body
                if(!userName || !email || !password || !address || !phone){
                    return res.staus(500).send({"message":"All fields are required"})
                }
                const existing = await UserModel.findOne({email:email})
                if(existing){
                    return res.status(500).send({"message":"User already registered"})
                }
                const user = await UserModel.create({
                    userName:userName,
                    email:email,
                    password:password,
                    address:address,
                    phone:phone
                   })
                   await user.save()
                   res.send({"message":"Successfully Registered"})
           } catch (error) {
            res.status(500)
            console.log(error)
           }
    }
}

export default UserControl
