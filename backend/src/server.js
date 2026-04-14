import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser"

import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.route.js"


dotenv.config();

const app = express();


const PORT=process.env.PORT;



app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://auth4321.netlify.app"
  ],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
    connectDB();
})

