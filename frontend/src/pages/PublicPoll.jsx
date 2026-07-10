import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {io} from "socket.io-client";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const socket=io("http://localhost:4000");

export default function PublicPoll(){

const {id}=useParams();
const [poll,setPoll]=useState(null);
const [selected,setSelected]=useState(null);
const [expired,setExpired]=useState(false);

useEffect(()=>{

fetchPoll();

socket.on("pollUpdated",(updatedPoll)=>{

if(updatedPoll._id===id){

setPoll(updatedPoll);

}

});


return()=>{

socket.off("pollUpdated");

};


},[]);



async function fetchPoll(){

try{

const res=await axios.get(
`http://localhost:4000/api/polls/${id}`
);


console.log(res.data);


if(!res.data.published){

alert("Poll is not published yet");

}


if(res.data.expiry && new Date()>new Date(res.data.expiry)){

setExpired(true);

}


setPoll(res.data);


}catch(error){

console.log(error);

}

}




async function vote(){

if(selected===null){

alert("Please select an option");

return;

}


if(expired){

alert("Poll has expired");

return;

}


try{


await axios.post(
`http://localhost:4000/api/polls/vote/${id}`,
{
optionIndex:selected
}
);


alert("Vote submitted");

setSelected(null);


}catch(error){

console.log(error);

alert(
error.response?.data?.message || "Something went wrong"
);


}

}



if(!poll){

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">

Loading...

</div>

)

}



const options=poll.options || poll.questions?.[0]?.options || [];


const question=
poll.question ||
poll.questions?.[0]?.question ||
poll.title ||
"Poll";



return(

<div className="min-h-screen bg-black text-white">


<div className="max-w-3xl mx-auto px-8 py-10">


<Card className="bg-white/10 border-white/20">


<CardContent className="p-8">


<h1 className="text-3xl font-bold text-white">

{question}

</h1>



<p className="text-gray-300 mt-3">

{poll.description}

</p>



{
expired &&

<p className="text-red-500 mt-4 font-semibold">

This poll has expired

</p>

}




<div className="mt-8 space-y-4">


{

options.map((option,index)=>(


<button

key={index}

disabled={expired}

onClick={()=>setSelected(index)}

className={`w-full p-4 rounded border text-left ${
selected===index
?
"border-orange-500 bg-orange-500/20"
:
"border-white/20 bg-white/5"
}`}

>


<div className="flex justify-between">


<span className="text-white">

{option.text}

</span>


<span className="text-orange-500">

{option.votes} votes

</span>


</div>


</button>


))

}


</div>




<Button

onClick={vote}

disabled={selected===null || expired}

className="mt-8 bg-orange-500 hover:bg-orange-600 text-white"

>


{
expired?
"Poll Expired":
"Submit Vote"
}


</Button>



</CardContent>


</Card>


</div>


</div>


)

}