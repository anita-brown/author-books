"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDb = exports.closeDb = exports.connectDb = void 0;
// import mongoose from "mongoose";
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let memoryServerConnection = mongoose_1.default.connection;
let memoryServer = new mongodb_memory_server_1.MongoMemoryServer();
const connectDb = async () => {
    try {
        await memoryServer.start();
        const uri = memoryServer.getUri();
        mongoose_1.default.connect(uri);
        memoryServerConnection.on('connection', () => {
            console.log('mem-server connected successfully');
        });
        memoryServerConnection.on('error', () => {
            console.log('memory server could not connect.');
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
const closeDb = async () => {
    try {
        await memoryServerConnection.dropDatabase();
        await memoryServerConnection.close();
        await memoryServer.stop();
    }
    catch (error) {
        console.log(error);
        console.log('error occurred in closeDb');
    }
};
exports.closeDb = closeDb;
const clearDb = async () => {
    try {
        await memoryServerConnection.dropDatabase();
    }
    catch (error) {
        console.log('error occurred while closing database');
    }
};
exports.clearDb = clearDb;
