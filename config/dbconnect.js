import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const databaseConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"coalminemanagement"
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database",error);
    }
}

export default databaseConnection;