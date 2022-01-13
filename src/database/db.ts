// import mongoose from "mongoose";
import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";
// import dotenv from 'dotenv';
// dotenv.config()

export const mongoConnectDB = () => {
    try {
      mongoose.connect(process.env.DB_URL as string).then(() => {
        console.log("Connected to DB");
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const mongoTestDB = () => {
    try{
      MongoMemoryServer.create().then((mongo: { getUri: () => any; }) => {
        const uri = mongo.getUri();
        mongoose.connect(uri).then(() => {
          console.log("connected to mongoTestDB");
        });
      });

      const memoryServer = MongoMemoryServer.create()
    }
    catch (error) {
      console.log(error);
    }
  };