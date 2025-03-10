
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:{type:String,required:[true,'user name is required']},
    email:{type:String,required:[true,'email is required'],unique:true},
    password:{type:String,required:true},
    address:{type:Array},
    phone:{type:Number,required:[true,'phone no is required']},
    usertype:{type:String,required:[true,'user type is required'],default:'client',enum:['client','admin','vendor','driver']},
    profile:{type:String,default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'}
},{timestamps:true})

const UserModel = mongoose.model('user',UserSchema);

export default UserModel