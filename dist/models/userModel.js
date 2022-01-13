"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'An author must have a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'An author must have a last name'],
    },
    DOB: {
        type: String,
        required: [true, 'An author must have a valid DOB']
    },
    email: {
        type: String,
        required: [true, 'An author must have a valid email'],
        lowercase: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'An author must have a valid phone number'],
    },
    password: {
        type: String,
        required: [true, 'Put in strong password'],
        select: false
    }
}, { timestamps: true });
// 
exports.userSchema.pre("save", async function () {
    this.password = await bcrypt_1.default.hash(this.password, 10);
});
const User = mongoose_1.default.model('User', exports.userSchema);
exports.default = User;
