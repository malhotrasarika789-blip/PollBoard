import express from "express";
import Response from "../models/Response.js";
import Poll from "../models/Poll.js";
import {io} from "../server.js";

const router=express.Router();

router.post("/submit",async(req,res)=>{
try{

const {poll,answers}=req.body;

const response=await Response.create({
poll,
answers
});

const pollData=await Poll.findById(poll);

answers.forEach((ans)=>{

if(
pollData.questions[ans.questionId] &&
pollData.questions[ans.questionId].options[ans.optionIndex]
){

pollData.questions[ans.questionId].options[ans.optionIndex].votes+=1;

}

});


await pollData.save();

io.emit("pollUpdated",pollData);


res.status(201).json({
success:true,
message:"Response submitted successfully",
response
});


}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:error.message
});

}
});


export default router;