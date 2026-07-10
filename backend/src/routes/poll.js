import express from "express";
import Poll from "../models/Poll.js";
import authMiddleware from "../middleware/auth.js";
import {io} from "../server.js";
import {createPoll} from "../controllers/poll.controller.js";

const router=express.Router();

router.post("/create",createPoll);


router.post("/vote/:pollId",async(req,res)=>{
const {optionIndex}=req.body;

try{

const poll=await Poll.findById(req.params.pollId);

if(!poll){
return res.status(404).json({
message:"Poll not found"
});
}


if(poll.options){

poll.options[optionIndex].votes+=1;

}
else if(poll.questions){

poll.questions[0].options[optionIndex].votes+=1;

}


await poll.save();

io.emit("pollUpdated",poll);


res.json({
message:"Vote recorded successfully",
poll
});


}catch(error){

res.status(400).json({
error:error.message
});

}

});



router.get("/",async(req,res)=>{
try{

const polls=await Poll.find().populate("createdBy","email");

res.json(polls);

}catch(error){

res.status(400).json({
error:error.message
});

}

});



router.get("/analytics/:pollId",async(req,res)=>{
try{

const poll=await Poll.findById(req.params.pollId);

if(!poll){
return res.status(404).json({
message:"Poll not found"
});
}


let totalResponses=0;


if(poll.questions){

poll.questions.forEach(q=>{
q.options.forEach(option=>{
totalResponses+=option.votes;
});
});

}


if(poll.options){

poll.options.forEach(option=>{
totalResponses+=option.votes;
});

}



res.json({

title:poll.title || poll.question,

totalResponses,

questions:poll.questions || [],

options:poll.options || []

});


}catch(error){

res.status(500).json({
message:error.message
});

}

});



router.get("/:pollId",async(req,res)=>{
try{

const poll=await Poll.findById(req.params.pollId).populate("createdBy","email");

if(!poll){
return res.status(404).json({
message:"Poll not found"
});
}


res.json(poll);


}catch(error){

res.status(400).json({
error:error.message
});

}

});



router.patch("/publish/:pollId",async(req,res)=>{
try{

const poll=await Poll.findById(req.params.pollId);

if(!poll){
return res.status(404).json({
message:"Poll not found"
});
}

poll.published=true;

await poll.save();

res.json({
message:"Poll published successfully",
poll
});

}catch(error){

res.status(500).json({
error:error.message
});

}
});



router.delete("/delete/:id",async(req,res)=>{

try{

await Poll.findByIdAndDelete(req.params.id);

res.json({
message:"Poll deleted"
});


}catch(error){

res.status(500).json({
error:error.message
});

}

});


export default router;