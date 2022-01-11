"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.authorSchema = new mongoose_1.default.Schema({
    author_name: {
        type: String,
        required: [true, 'An author must have a name'],
        unique: true
    },
    age: {
        type: Number
    },
    address: { type: String,
        required: [true, 'An author must have a name'],
        unique: true },
}, { timestamps: true });
const Author = mongoose_1.default.model('Author', exports.authorSchema);
exports.default = Author;
