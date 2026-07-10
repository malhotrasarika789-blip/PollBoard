import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  ShieldCheck,
  Users,
  Radio,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
return (
<div className="min-h-screen bg-black text-white overflow-hidden">
<div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[140px]" />
<nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
<h1 className="text-2xl font-bold text-white">
Poll<span className="text-orange-500">Board</span>
</h1>

<div className="flex gap-3">
<Link to="/login">
<Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
Login
</Button>
</Link>

<Link to="/signup">
<Button className="bg-orange-500 hover:bg-orange-600 text-white">
Signup
</Button>
</Link>
</div>
</nav>
<section className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-20">
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm mb-8 text-gray-300">

<Radio size={16} className="text-orange-500"/>
Real-time Poll Analytics Platform
</div>
<h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">

Create Polls.
<br/>
Collect Feedback.
<br/>
<span className="text-orange-500">
Understand People.
</span>

</h2>
<p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
Build powerful polls, share public links, collect responses and analyze insights with real-time analytics.
</p>

<div className="flex justify-center gap-4 mt-10">
<Link to="/signup">

<Button size="lg" className="bg-orange-500 hover:bg-orange-600 gap-2 text-white">
Get Started
<ArrowRight size={18}/>
</Button>
</Link>
<Link to="/dashboard">
<Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
Dashboard
</Button>
</Link>
</div>
</section>

<section className="relative z-10 max-w-6xl mx-auto px-6 mt-32 grid md:grid-cols-3 gap-6">

<FeatureCard icon={<Users size={28}/>} title="Public Poll Sharing" desc="Share unique poll links and collect responses easily."/>
<FeatureCard icon={<Clock3 size={28}/>} title="Expiry Control" desc="Automatically disable polls after selected expiry time."/>
<FeatureCard icon={<BarChart3 size={28}/>} title="Live Analytics" desc="Track responses and participation insights."/>

<FeatureCard icon={<ShieldCheck size={28}/>} title="Secure Responses" desc="Support anonymous and authenticated submissions."/>
<FeatureCard icon={<CheckCircle2 size={28}/>} title="Question Validation" desc="Handle mandatory and optional questions properly."/>

<FeatureCard icon={<Radio size={28}/>} title="Realtime Updates" desc="Socket.io powered live response updates."/>
</section>

<section className="relative z-10 max-w-5xl mx-auto px-6 mt-32 text-center">

<h3 className="text-4xl font-bold text-white">
How PollBoard Works
</h3>

<div className="grid md:grid-cols-3 gap-6 mt-12">
{
[
"Create your poll with multiple questions",
"Share link and collect responses",
"Analyze and publish final results"
].map((item,index)=>(

<Card key={index} className="bg-white/5 border-white/10 text-white">

<CardContent className="p-8">

<div className="text-orange-500 text-3xl font-bold">
0{index+1}
</div>

<p className="mt-4 text-gray-300">
{item}
</p>
</CardContent>
</Card>
))
}

</div>
</section>

<section className="relative z-10 mt-32 text-center pb-20">
<h3 className="text-4xl font-bold text-white">
Ready to Participate?
</h3>

<p className="text-gray-400 mt-4">
Create polls, share links and collect feedback.
</p>

<Link to="/signup">

<Button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white">
Create Account
</Button>
</Link>
</section>

<footer className="border-t border-white/10 py-8 text-center text-gray-400">
<h2 className="text-white font-semibold text-lg">
MasterJi
</h2>
<p className="mt-2">
Developed by ChaiCode
</p>

<p className="mt-4 text-sm">
© 2026 MasterJi. All rights reserved.
</p>

</footer>
</div>
)
}

function FeatureCard({icon,title,desc}){
return(
<Card className="bg-white/5 border-white/10 hover:border-orange-500/40 transition text-white">
<CardContent className="p-6 text-white">
<div className="text-orange-500 mb-4">
{icon}
</div>

<h4 className="text-xl font-semibold text-white">
{title}
</h4>

<p className="text-gray-400 mt-2">
{desc}
</p>

</CardContent>
</Card>
)
}