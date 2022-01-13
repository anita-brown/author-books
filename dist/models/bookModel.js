"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookSchema = new mongoose_1.default.Schema({
    authorId: { type: String, },
    bookname: {
        type: String,
        required: [true, 'An author must have a bookname'],
        unique: true
    },
    isPublished: {
        type: Boolean,
    },
    datePublished: {
        type: String,
    },
    serialNumber: {
        type: Number,
        required: [true, 'A book must have a serialNumber'],
        unique: true
    },
}, { timestamps: true });
const Book = mongoose_1.default.model('Book', exports.bookSchema);
exports.default = Book;
