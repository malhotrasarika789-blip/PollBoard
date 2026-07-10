import {useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card,CardContent} from "@/components/ui/card";

export default function Login(){

const navigate=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


async function handleLogin(){

try{

const res=await axios.post(
"http://localhost:4000/api/users/login",
{
email,
password
}
);


localStorage.setItem(
"token",
res.data.token
);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);


alert("Login Successful");

navigate("/dashboard");


}catch(error){

console.log(error.response?.data || error.message);

alert(
error.response?.data?.message || "Login failed"
);

}

}



return(

<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

<Card className="w-full max-w-md bg-white/10 border-white/20">

<CardContent className="p-8">


<h1 className="text-3xl font-bold text-white">
Welcome Back
</h1>


<p className="text-gray-400 mt-2">
Login to your PollBoard account
</p>



<Input
className="mt-6 bg-white/10 text-white placeholder:text-gray-400"
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
onClick={handleLogin}
className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
>
Login
</Button>



<p className="text-gray-300 mt-5 text-center">

Don't have account?

<Link
to="/signup"
className="text-orange-500 ml-2"
>
Signup
</Link>

</p>


</CardContent>

</Card>

</div>

)

}