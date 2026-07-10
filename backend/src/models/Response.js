import mongoose from "mongoose";

const responseSchema=new mongoose.Schema({
poll:{
type:mongoose.Schema.Types.ObjectId,
ref:"Poll",
required:true
},
answers:[
{
questionId:String,
optionIndex:Number
}
],
submittedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
},{timestamps:true});

export default mongoose.model("Response",responseSchema);