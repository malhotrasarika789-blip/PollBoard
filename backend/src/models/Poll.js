import mongoose from "mongoose";

const optionSchema=new mongoose.Schema({
text:{
type:String,
required:true
},
votes:{
type:Number,
default:0
}
});

const questionSchema=new mongoose.Schema({
question:{
type:String,
required:true
},
options:{
type:[optionSchema],
required:true
},
required:{
type:Boolean,
default:false
}
});

const pollSchema=new mongoose.Schema({
title:{
type:String,
required:true
},
description:{
type:String,
default:""
},
expiry:{
type:Date
},
responseMode:{
type:String,
enum:["anonymous","authenticated"],
default:"anonymous"
},
questions:{
type:[questionSchema],
required:true
},
createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
published:{
type:Boolean,
default:false
}
},{timestamps:true});

export default mongoose.model("Poll",pollSchema);