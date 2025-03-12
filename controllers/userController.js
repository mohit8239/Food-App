import mongoose from "mongoose";
import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

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
                //Creating Salt
                const salt = bcrypt.genSaltSync(10)
                //Hashing password
                const hashedpassword = await bcrypt.hash(password,salt)
                const user = await UserModel.create({
                    userName:userName,
                    email:email,
                    password:hashedpassword,
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

    static UserLogin = async(req,res)=>{
        const{email,password} = req.body
        if(!email || !password){
            return res.status(500).send({"message":"Email or password is missing"})
        }
        const user = await UserModel.findOne({email:email})
        if(!user){
            return res.status(404).send({"message":"Email not registered"})
        // }else{
        //     return res.send({"message":"User Logged in"})   
         }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(500).send({"message":"Password does not match"})
            }else{
                //token
                const token = jwt.sign({id:user._id},process.env.Secret,{expiresIn:"2d"})
                return res.status(200).send({"message":"User Logged in",token})
            }
    }

    static loggedUser = async(req,res)=>{
        const user = await UserModel.findById({_id:req.body.id})
        if(!user){
            return res.status(401).send({"message":"User not found"})
        }
        user.password = undefined
        res.status(200).send({message:"User get successfully",user})
    }

    static updateUser = async(req,res)=>{
        const user = await UserModel.findById({_id:req.body.id})
        if(!user){
            return res.status(401).send({"message":"User not found"})
        }
        const{userName,address,phone} = req.body
        if(userName){
            user.userName = userName
        }
        if(address){
            user.address = address
        }
        if(phone){
            user.phone = phone
        }
        //Save
        await user.save()

        user.password = undefined

        res.status(200).send({message:"User updated successfully",user})

    }
}


export default UserControl
