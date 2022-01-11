"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntry = exports.writeUsersFile = exports.readUsersFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
// // import uuidv4 from 'uuidv4'
// // Export and Create interface for keys types in the object
// // Export, Create, Read and write files to database in json format
// const myFilePath = path.join(__dirname, '../database.json');
const usersPath = path_1.default.join(__dirname, '../users.json');
const readUsersFile = () => {
    try {
        const userData = fs_1.default.readFileSync(usersPath, { encoding: "utf-8" });
        console.log(userData);
        return JSON.parse(userData);
    }
    catch (error) {
        console.log(error, "error occured");
        return [];
    }
};
exports.readUsersFile = readUsersFile;
const writeUsersFile = (userData) => {
    try {
        fs_1.default.writeFileSync(usersPath, JSON.stringify(userData, null, 4));
    }
    catch (error) {
        console.log(error, "error occured");
    }
};
exports.writeUsersFile = writeUsersFile;
const validateEntry = (Author) => {
    const schema = joi_1.default.object({
        author_name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required()
    }).unknown();
    return schema.validate(Author);
};
exports.validateEntry = validateEntry;
