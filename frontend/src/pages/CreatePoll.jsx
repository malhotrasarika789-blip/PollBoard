import {useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Card,CardContent} from "@/components/ui/card";
import {Plus,Trash2,X} from "lucide-react";

export default function CreatePoll(){

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [expiry,setExpiry]=useState("");
const [mode,setMode]=useState("anonymous");

const [questions,setQuestions]=useState([
{
question:"",
options:[{text:""},{text:""}],
required:false
}
]);

function addQuestion(){ setQuestions([ ...questions, {
question:"",
options:[{text:""},{text:""}],
required:false
}
]);
}

function removeQuestion(index){
setQuestions(
questions.filter((_,i)=>i!==index)
);
}

function updateQuestion(index,value){
const copy=[...questions];
copy[index].question=value;
setQuestions(copy);
}

function updateOption(qIndex,oIndex,value){
const copy=[...questions];
copy[qIndex].options[oIndex].text=value;
setQuestions(copy);
}

function addOption(index){
const copy=[...questions];
copy[index].options.push({text:""});
setQuestions(copy);
}

function removeOption(qIndex,oIndex){
const copy=[...questions];
copy[qIndex].options.splice(oIndex,1);
setQuestions(copy);
}

function toggleRequired(index){
const copy=[...questions];
copy[index].required=!copy[index].required;
setQuestions(copy);
}

async function handleCreatePoll(){

if(title.trim()===""){
alert("Enter Poll Title");
return;
}

for(let q of questions){

if(q.question.trim()===""){
alert("Enter Question");
return;
}

for(let o of q.options){

if(o.text.trim()===""){
alert("Fill all Options");
return;
}

}

}

try{

const data={
title:title.trim(),
description:description.trim(),
expiry,
responseMode:mode,
questions
};

const res=await axios.post(
"http://localhost:4000/api/polls/create",
data
);

console.log(res.data);

alert("Poll Created Successfully");

setTitle("");
setDescription("");
setExpiry("");
setMode("anonymous");
setQuestions([
{
question:"",
options:[{text:""},{text:""}],
required:false
}
]);

}
catch(error){

console.log(error.response?.data || error.message);

alert(error.response?.data?.message || "Something went wrong");

}

}

return(
<div className="min-h-screen bg-black text-white p-10">

<div className="max-w-4xl mx-auto">

<h1 className="text-4xl font-bold text-white">
Create Poll
</h1>

<p className="text-gray-400 mt-2">
Create a poll and collect feedback
</p>

<Card className="mt-8 bg-white/5 border-white/10">

<CardContent className="p-6 space-y-5">

<Input
placeholder="Poll Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="bg-white/10 text-white placeholder:text-gray-400"
/>

<Textarea
placeholder="Poll Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="bg-white/10 text-white placeholder:text-gray-400"
/>

<Input
type="datetime-local"
value={expiry}
onChange={(e)=>setExpiry(e.target.value)}
className="bg-white/10 text-white"
/>

<div className="flex gap-5">

<label className="text-white flex items-center gap-2">

<input
type="radio"
checked={mode==="anonymous"}
onChange={()=>setMode("anonymous")}
/>

<span>
Anonymous
</span>

</label>

<label className="text-white flex items-center gap-2">

<input
type="radio"
checked={mode==="authenticated"}
onChange={()=>setMode("authenticated")}
/>

<span>
Authenticated
</span>

</label>

</div>

</CardContent>

</Card>

<div className="mt-8 space-y-5">

<h2 className="text-2xl font-bold text-white">
Questions
</h2>

{questions.map((q,index)=>(

<Card
key={index}
className="bg-white/5 border-white/10"
>

<CardContent className="p-6">

<div className="flex justify-between">

<h3 className="text-white">
Question {index+1}
</h3>

{questions.length>1&&(
<Button
onClick={()=>removeQuestion(index)}
className="bg-red-500"
>
<Trash2 size={16}/>
</Button>
)}

</div>

<Input
placeholder="Enter Question"
value={q.question}
onChange={(e)=>updateQuestion(index,e.target.value)}
className="mt-4 bg-white/10 text-white placeholder:text-gray-400"
/>

<div className="space-y-3 mt-5">

{q.options.map((option,oIndex)=>(

<div
key={oIndex}
className="flex gap-3"
>

<Input
placeholder={`Option ${oIndex+1}`}
value={option.text}
onChange={(e)=>updateOption(index,oIndex,e.target.value)}
className="bg-white/10 text-white placeholder:text-gray-400"
/>

{q.options.length>1&&(
<Button
onClick={()=>removeOption(index,oIndex)}
className="bg-red-500"
>
<X size={16}/>
</Button>
)}

</div>

))}

</div>

<Button
onClick={()=>addOption(index)}
className="mt-4 bg-orange-500"
>
<Plus size={16}/>
Add Option
</Button>

<div className="mt-4">

<label className="text-white flex items-center gap-2">

<input
type="checkbox"
checked={q.required}
onChange={()=>toggleRequired(index)}
/>

<span>
Mandatory Question
</span>

</label>

</div>

</CardContent>

</Card>

))}

<Button
onClick={addQuestion}
className="bg-orange-500"
>
<Plus size={16}/>
Add Question
</Button>

</div>

<Button
onClick={handleCreatePoll}
className="mt-8 w-full bg-orange-500"
>
Create Poll
</Button>

</div>

</div>
);

}