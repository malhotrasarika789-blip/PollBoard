import {useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card,CardContent} from "@/components/ui/card";

export default function Signup(){

const navigate=useNavigate();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


async function handleSignup(){

try{

const res=await axios.post(
"http://localhost:4000/api/users/signup",
{
name,
email,
password
}
);

console.log(res.data);

alert("Signup Successful");

navigate("/login");


}catch(error){

console.log(error.response?.data || error.message);

alert(
error.response?.data?.message || "Signup failed"
);

}

}


return(

<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

<Card className="w-full max-w-md bg-white/10 border-white/20">

<CardContent className="p-8">

<h1 className="text-3xl font-bold text-white">
Create Account
</h1>


<p className="text-gray-400 mt-2">
Signup to create and manage polls
</p>



<Input
className="mt-6 bg-white/10 text-white placeholder:text-gray-400"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<Input
className="mt-4 bg-white/10 text-white placeholder:text-gray-400"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<Input
type="password"
className="mt-4 bg-white/10 text-white placeholder:text-gray-400"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<Button
onClick={handleSignup}
className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
>
Signup
</Button>


<p className="text-gray-300 mt-5 text-center">

Already have account?

<Link
to="/login"
className="text-orange-500 ml-2"
>
Login
</Link>

</p>


</CardContent>

</Card>

</div>

)

}