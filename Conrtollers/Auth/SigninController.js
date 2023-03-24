const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const jwt_secret="Chatbox"

const Usermodel=require("../../Models/Usermodel")
const e = require("express")

router.post("/login",async(req,res)=>{
    try {
        const user=await Usermodel.findOne({email:req.body.email})
        if(user){
            const compare=await bcrypt.compare(req.body.password,user.password)
            if(compare){
                const data={
                    email:user.email,
                    _id:user._id
                }
                const token=jwt.sign(data,jwt_secret,{expiresIn:"50m"})
                res.status(200).json({message:"user found",token})
            }else{
                res.status(400).json({message:"password Incorrect"})
            }
        }else{
            res.status(400).json({message:"no user found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


module.exports=router