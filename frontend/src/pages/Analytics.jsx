import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Card,CardContent} from "@/components/ui/card";

export default function Analytics(){

const {id}=useParams();
const [data,setData]=useState(null);

    useEffect(()=>{ fetchAnalytics(); },[]);


    async function fetchAnalytics(){
        try{
            const res=await axios.get(
        `https://pollboard-l1sq.onrender.com/api/polls/analytics/${id}`
);

        console.log(res.data);
            setData(res.data)
            }catch(error){
    console.log(error);
}
}

    if(!data){
        return(
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </div>
        )
        }

const options=data.options || data.questions?.[0]?.options || [];
return(
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-8 py-10">
                <h1 className="text-4xl font-bold text-white">
            {data.title || "Poll Analytics"}
    </h1>
                    <p className="text-gray-300 mt-2">
                    View poll performance and responses
                </p>

            <Card className="bg-white/10 border-white/20 mt-8">
                <CardContent className="p-6">
                    <h2 className="text-xl text-gray-300">
                    Total Responses
                </h2>
            <p className="text-5xl font-bold text-orange-500 mt-3">
                {data.totalResponses}
            </p>
</CardContent>
</Card>

    <Card className="bg-white/10 border-white/20 mt-8">

    <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
            Results
            </h2>

    <div className="space-y-5">
        {
            options.map((option,index)=>{
                const percentage = data.totalResponses? Math.round((option.votes/data.totalResponses)*100): 0;
    return(
    <div key={index}>
    <div className="flex justify-between mb-2">
        <span className="text-white">
            {option.text}
        </span>
        <span className="text-orange-500">
            {option.votes} votes ({percentage}%)
        </span>
    </div>

<div className="w-full bg-white/10 rounded h-3">
<div className="bg-orange-500 h-3 rounded" style={{ width:`${percentage}%`}}>
</div>
</div>
</div>
)
})
}
</div>
</CardContent>

</Card>
</div>
</div>
)
}