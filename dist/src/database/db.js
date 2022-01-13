"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoTestDB = exports.mongoConnectDB = void 0;
// import mongoose from "mongoose";
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
// import dotenv from 'dotenv';
// dotenv.config()
const mongoConnectDB = () => {
    try {
        mongoose_1.default.connect(process.env.DB_URL).then(() => {
            console.log("Connected to DB");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoConnectDB = mongoConnectDB;
const mongoTestDB = () => {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(() => {
                console.log("connected to mongoTestDB");
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoTestDB = mongoTestDB;
