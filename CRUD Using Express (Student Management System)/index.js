import express from "express"
import { readFileSync } from "fs";
const app = express();

app.get("/students",(req,res)=>{
const data = readFileSync("./db.json","utf-8")
    res.send(data)
})


app.listen(3000,()=>{
    console.log("Server is runnnnnnning");
    
})