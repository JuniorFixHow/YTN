import express, { Express, Application, json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connecDB } from "./mongoose";
import mongoose from "mongoose";

dotenv.config();
const app:Application = express();
connecDB();
app.use(cors());
app.use(express.json());

mongoose.connection.on('connected', ()=>{
    console.log('Mongo is back')
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongo is disconnected')
})


const PORT = process.env.PORT || 5555;
app.listen(()=>{
    console.log(`server is running on ${PORT}`);
})