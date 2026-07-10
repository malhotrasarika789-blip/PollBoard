import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreatePoll from "./pages/CreatePoll";
import PublicPoll from "./pages/PublicPoll";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/create-poll" element={<CreatePoll />}/>
        <Route path="/poll/:id" element={<PublicPoll/>}/>
        <Route path="/analytics/:id" element={<Analytics/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;