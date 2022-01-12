"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookEntry = exports.validateEntry = void 0;
const joi_1 = __importDefault(require("joi"));
// // import uuidv4 from 'uuidv4'
// // Export and Create interface for keys types in the object
// // Export, Create, Read and write files to database in json format
// const myFilePath = path.join(__dirname, '../database.json');
// const usersPath = path.join(__dirname, '../users.json');
// export const readUsersFile= () => {
//     try {
//         const userData = fs.readFileSync(usersPath, {encoding: "utf-8"})
//         console.log(userData)
//         return JSON.parse(userData);
//     } catch (error) {
//         console.log(error, "error occured")
//         return []
//     }
// }
// export const writeUsersFile = (userData: Users[]) => {
//     try {
//         fs.writeFileSync(usersPath, JSON.stringify(userData, null, 4))
//     } catch (error) {
//          console.log(error, "error occured")
//     }
// }
const validateEntry = (Author) => {
    const schema = joi_1.default.object({
        author_name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required()
    }).unknown();
    return schema.validate(Author);
};
exports.validateEntry = validateEntry;
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
