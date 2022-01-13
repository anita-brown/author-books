// import mongoose from "mongoose";
import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServerConnection = mongoose.connection;
let memoryServer = new MongoMemoryServer();


export const connectDb = async () => {
  try {
    await memoryServer.start()
    const uri = memoryServer.getUri();
    mongoose.connect(uri)
    memoryServerConnection.on('connection', () => {
      console.log('mem-server connected successfully')
    });

    memoryServerConnection.on('error', () => {
      console.log('memory server could not connect.')
    })

  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export const closeDb = async () => {
  try {
    await memoryServerConnection.dropDatabase();
    await memoryServerConnection.close();

    await memoryServer.stop();
  } catch (error) {
    console.log(error);
    console.log('error occurred in closeDb')
  }
}

export const clearDb = async () => {
  try {
    await memoryServerConnection.dropDatabase();
  } catch (error) {
    console.log('error occurred while closing database')
  }
}