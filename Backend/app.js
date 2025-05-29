import connectWithDB from "./db/index.js";
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

connectWithDB();

const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: 'https://riskmanagement009.netlify.app',
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);

app.get('/',(req,res) => {
    res.send("Sachin MC")
})


app.listen(PORT,() => {
    console.log(`app is listening to port ${PORT}`);
})