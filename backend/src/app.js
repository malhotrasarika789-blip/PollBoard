import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import pollRoutes from "./routes/poll.js";
import responseRoutes from "./routes/response.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors({
origin:[
"http://localhost:5173",
"https://frontend-psi-indol-95.vercel.app",
"https://frontend-4poa466z0-malhotrasarika789-1336s-projects.vercel.app"
],
methods:["GET","POST","PATCH","DELETE"],
credentials:true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/responses",responseRoutes);
app.use("/api/users",userRoutes);

export default app;

