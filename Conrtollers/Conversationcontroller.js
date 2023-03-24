const express=require("express")
const router=express.Router()

const ConversationModel=require("../Models/Coversationmodel")
const Authverify=require("./Middleware/Verify")
const UserVerify=require("./Middleware/UserVerify")


router.post("/conversation",Authverify,UserVerify,async(req,res)=>{
    try {
        const newConversation=new ConversationModel({
            members:[req.Uniqueid,req.body.receiverId]
        })
    
        await newConversation.save()
        res.status(200).json(newConversation)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


// router.get("/conversations/userId",async(res,req)=>{
//     try {
//         const getConversation= await ConversationModel.find({
//             members:{$in :[req.params.userId]}
//         })
//         res.status(200).json(getConversation)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:"something went wrong"})
//     }
// })


router.get("/conversations",Authverify,UserVerify,async(req,res)=>{
    try {
        const getCons=await ConversationModel.find({
            members:{
                $in:req.Uniqueid
            }
        })
        res.status(200).json(getCons)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})


router.get("/conversations/:id",Authverify,UserVerify,async(req,res)=>{
    try {
        const getCons=await ConversationModel.find({
            members:{
                $all:[req.Uniqueid,req.params.id]
            }
        })
        res.status(200).json(getCons)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
})



module.exports=router