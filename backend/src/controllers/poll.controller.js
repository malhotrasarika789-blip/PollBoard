import Poll from "../models/Poll.js";
export async function createPoll(req,res){

try{
const { title, description, expiry, responseMode, questions }=req.body;
const poll=await Poll.create({
title,
description,
expiry,
responseMode,
questions
});
res.status(201).json({
success:true,
message:"Poll created successfully 🚀",
poll
});
}catch(error){
console.log("CREATE POLL ERROR:",error);
res.status(500).json({
success:false,
message:error.message
});
}
}