import {useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Plus,BarChart3,Users,Clock,Copy} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card,CardContent} from "@/components/ui/card";

export default function Dashboard(){

const [polls,setPolls]=useState([]);

useEffect(()=>{
fetchPolls();
},[]);

async function fetchPolls(){
try{
const res=await axios.get("https://pollboard-l1sq.onrender.com/api/polls");
setPolls(res.data);
}catch(error){
console.log(error);
}
}

const totalResponses=polls.reduce((total,poll)=>{
if(poll.options){
return total+poll.options.reduce((a,o)=>a+o.votes,0);
}
if(poll.questions){
return total+poll.questions.reduce((a,q)=>a+q.options.reduce((x,o)=>x+o.votes,0),0);
}
return total;
},0);

return(
<div className="min-h-screen bg-black text-white">

<nav className="flex justify-between items-center px-8 py-6 border-b border-white/10">

<h1 className="text-2xl font-bold text-white">
Poll<span className="text-orange-500">Board</span>
</h1>

<div className="flex gap-3">
<Link to="/create-poll">
<Button className="bg-orange-500 hover:bg-orange-600 text-white">
<Plus size={18}/>
Create Poll
</Button>
</Link>

<Button onClick={()=>{ localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href="/login"; }}
className="bg-red-500 hover:bg-red-600 text-white">
Logout
</Button>

</div>
</nav>

<div className="max-w-7xl mx-auto px-8 py-10">

<h2 className="text-4xl font-bold text-white">
Dashboard
</h2>

<p className="text-gray-300 mt-2">
Manage your polls and analyze responses
</p>

<div className="grid md:grid-cols-3 gap-6 mt-10">
<StatCard icon={<BarChart3/>} title="Total Polls" value={polls.length}/>
<StatCard icon={<Users/>} title="Total Responses" value={totalResponses} />
<StatCard icon={<Clock/>} title="Active Polls" value={polls.filter((p)=>!p.published).length}/>

</div>
<section className="mt-12">

<h3 className="text-2xl font-semibold text-white">
Recent Polls
</h3>
<div className="grid md:grid-cols-2 gap-6 mt-6">
{
polls.map((poll)=>(
<PollCard key={poll._id} id={poll._id} title={poll.title||poll.question||poll.questions?.[0]?.question||"Untitled Poll"} responses={poll.options?.length||poll.questions?.length||0}
status={poll.published?"Published":"Active"}
published={poll.published}
fetchPolls={fetchPolls} />
))
}
{
polls.length===0&&
<p className="text-gray-300">
No polls created yet
</p>
}
</div>
</section>
</div>
</div>
)
}
function StatCard({icon,title,value}){

return(
<Card className="bg-white/10 border-white/20">

<CardContent className="p-6">

<div className="text-orange-500 mb-4">
{icon}
</div>

<h4 className="text-gray-300">
{title}
</h4>
<p className="text-4xl font-bold text-white mt-2">
{value}
</p>
</CardContent>
</Card>
)
}

function PollCard({id,title,responses,status,published,fetchPolls}){
async function publishPoll(){
try{
await axios.patch(
`https://pollboard-l1sq.onrender.com/api/polls/publish/${id}`
);

alert("Poll Published");
fetchPolls();
}catch(error){
console.log(error);
}
}

async function copyLink(){
const link=`https://frontend-psi-indol-95.vercel.app/poll/${id}`;
await navigator.clipboard.writeText(link);
alert("Poll link copied ✅");
}

return(
<Card className="bg-white/10 border-white/20">
<CardContent className="p-6">

<div className="flex justify-between items-center">

<h4 className="text-xl font-semibold text-white">
{title}
</h4>
<span className="text-orange-500">
{status}
</span>
</div>
<p className="text-gray-300 mt-4">
{responses} Questions
</p>
<div className="flex flex-wrap gap-3 mt-5">


<Link to={`/poll/${id}`}>

<Button className="bg-orange-500 hover:bg-orange-600 text-white">
View Poll
</Button>
</Link>
<Link to={`/analytics/${id}`}>

<Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
View Analytics
</Button>
</Link>

<Button onClick={publishPoll} disabled={published} className="bg-orange-500 hover:bg-orange-600 text-white">
{published? "Published": "Publish Poll"}

</Button>
<Button onClick={copyLink} variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">

<Copy size={16}/>
Copy Link
</Button>
</div>
</CardContent>
</Card>
)
}