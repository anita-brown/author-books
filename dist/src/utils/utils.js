"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserEntry = exports.validateBookEntry = exports.validateEntry = void 0;
const joi_1 = __importDefault(require("joi"));
//  Author validation with joi
const validateEntry = (Author) => {
    const schema = joi_1.default.object({
        author_name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required()
    }).unknown();
    return schema.validate(Author);
};
exports.validateEntry = validateEntry;
//  Book validation with joi
const validateBookEntry = (Book) => {
    const schema = joi_1.default.object({
        authorId: joi_1.default.string().required(),
        bookname: joi_1.default.string().required(),
        isPublished: joi_1.default.boolean().required(),
        datePublished: joi_1.default.number().required(),
        serialNumber: joi_1.default.number().required()
    }).unknown();
    return schema.validate(Book);
};
exports.validateBookEntry = validateBookEntry;
//  User validation with joi
const validateUserEntry = (User) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        DOB: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        phoneNumber: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    }).unknown();
    return schema.validate(User);
};
exports.validateUserEntry = validateUserEntry;
