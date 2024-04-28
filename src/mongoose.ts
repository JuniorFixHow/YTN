import mongoose, { Mongoose } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

interface MongoProps{
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongoProps = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {
        conn: null, promise:null
    }
}

export const connecDB = async ()=>{
    if(cached.conn) return cached.conn;

    if(!MONGO_URL) throw new Error('Invalid Mongoose URL')

    cached.promise = cached.promise || mongoose.connect(MONGO_URL,{
        dbName:'YTN', bufferCommands:false,
    })
    cached.conn = await cached.promise;
    console.log('mongo connected successfully');
    return cached.conn;
}



// let isconnected = false
// export const connectDb = async()=>{
//     mongoose.set('strictQuery', true);
//     if(isconnected){
//         console.log('Mongo already connected');
//         return
//     }
//     try {
//         await mongoose.connect(process.env.MONGO_URL,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//         });
//         isconnected = true;
//         console.log('mongo connected successfully');
//     } catch (error) {
//         throw new Error('DB failed')
//     }
// }