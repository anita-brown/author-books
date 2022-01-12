"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'An author must have a first name'],
        unique: true
    },
    lastName: {
        type: String,
        required: [true, 'An author must have a last name'],
        unique: true
    },
    DOB: {
        type: String,
        required: [true, 'An author must have a valid DOB'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'An author must have a valid email'],
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: [true, 'An author must have a valid phone number'],
        unique: true
    }
}, { timestamps: true });
const User = mongoose_1.default.model('User', exports.userSchema);
exports.default = User;
