import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 
import {mongoConnection} from "./db.js"
import { authRouter } from "./routes/auth.js";
import { articleRouter } from "./routes/article.js";
//intiialzing environtment
dotenv.config(); 


//initializing the PORT
const PORT = process.env.PORT;

//Initializing the server
const app = express(); 

//setting the database
mongoConnection(); 

//initializing middlewares
app.use(express.json()); 
app.use(cors()); 

app.get("/", (req,res)=>{
    res.send("Dotenv configured");
}); 

app.use("/api", authRouter); 
app.use("/api",articleRouter); 



//listening to server
app.listen(PORT, ()=>console.log(`Server started in localhost:${PORT}`)); 

