import dotenv from 'dotenv'
import express from "express";
import todosRoutes from "./routes/todos";
import bodyParser from "body-parser";

const PORT  = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use(todosRoutes);

app.listen(PORT, ()=>{
    console.log("Now listening for requests")
});
