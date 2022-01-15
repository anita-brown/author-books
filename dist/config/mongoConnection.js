"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDb() {
    const dbUrl = process.env.DB_URL;
    console.log(dbUrl, "database url");
    mongoose_1.default.connect(dbUrl, (error) => {
        if (error) {
            console.log('unable to connect to db');
            process.exit(1);
        }
        console.log('connected successfully to db.');
    });
}
exports.default = connectDb;
