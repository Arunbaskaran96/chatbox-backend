const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const Usermodel=require("../../Models/Usermodel")

const AuthVerify=require("../Middleware/Verify")
const UserVerify = require("../Middleware/UserVerify")

router.post("/register",async(req,res)=>{
    try {
        const newone=await Usermodel.findOne({email:req.body.email})
        if(!newone){
            const salt=await bcrypt.genSalt(10)
            const hash=await bcrypt.hash(req.body.password,salt)
            req.body.password=hash
    
            
        const newUser=new Usermodel({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            city:req.body.city,
            img:req.body.img,
            password:req.body.password
        })
    
        newUser.save().then(result=>{
            res.status(200).json({message:"created"})
        }).catch(err=>{
            console.log(err)
            res.status(500).json({message:"something went wrong"})
        })
        }else{
            res.status(400).json({message:"user already exists"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/users",AuthVerify,(req,res)=>{
    Usermodel.find().then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no user found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

router.get("/user/:id",AuthVerify,(req,res)=>{
    Usermodel.findOne({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no user found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

// router.get("/user/:id",AuthVerify,(req,res)=>{
//     Usermodel.find({_id:req.params.id}).then(result=>{
//         if(result){
//             res.status(200).json(result)
//         }else{
//             res.status(400).json({message:"no user found"})
//         }
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json({message:"something went wrong"})
//     })
// })

router.get("/user",AuthVerify,UserVerify,(req,res)=>{
    Usermodel.findOne({_id:req.Uniqueid}).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no user found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

router.put("/user",AuthVerify,UserVerify,(req,res)=>{
    Usermodel.findByIdAndUpdate({_id:req.Uniqueid},{$set:req.body}).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"no user found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


module.exports=router