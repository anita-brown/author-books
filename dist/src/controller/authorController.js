"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.getAuthorById = exports.updateAuthor = exports.create_authors = exports.getAllAuthors = void 0;
// import { readFile, writeFile, author } from '../utils/utils';
const utils_1 = require("../utils/utils");
const mySecret = 'ughyjkkoiughjkhu3jkhu748uhjki78h';
const authorModel_1 = __importDefault(require("../models/authorModel"));
//get all authors
const getAllAuthors = (req, res) => {
    try {
        authorModel_1.default.find({}, (err, authors) => {
            if (err)
                return res.json({ msg: "error occur in getting all authors..." });
            if (authors) {
                res.json(authors);
            }
        });
    }
    catch (error) {
        console.log(error, "error occured");
        res.status(500).json({ msg: "Server error occured" });
    }
};
exports.getAllAuthors = getAllAuthors;
//create authors details
const create_authors = async (req, res) => {
    try {
        const { error } = (0, utils_1.validateEntry)(req.body);
        if (error) {
            return res.status(401).json({ msg: " Validation failed" });
        }
        const { author_name, age, address } = req.body;
        console.log(author_name);
        await authorModel_1.default.create({
            author_name,
            age,
            address
        });
        res.status(201).json({ msg: " author saved...." });
    }
    catch (error) {
        console.log(error, "error occured.");
        res.status(500).json({ msg: "Server error occured" });
    }
};
exports.create_authors = create_authors;
// update author
const updateAuthor = (req, res) => {
    //catch error from request body
    try {
        authorModel_1.default.findByIdAndUpdate(req.params.id, req.body, (err, authors) => {
            res.status(201).json({ msg: " author updated...." });
            if (err)
                return res.json(err);
            if (authors) {
                return res.json(authors);
            }
        });
    }
    catch (error) {
        console.log(error, "error occured");
    }
};
exports.updateAuthor = updateAuthor;
//get author by id
const getAuthorById = (req, res) => {
    //catch error from request body
    try {
        authorModel_1.default.findById(req.params.id, (err, authors) => {
            if (err)
                return res.json(err);
            if (authors) {
                return res.json(authors);
            }
        });
    }
    catch (error) {
        console.log(error, "error occured");
    }
};
exports.getAuthorById = getAuthorById;
// delete Author
const deleteAuthor = (req, res) => {
    try {
        authorModel_1.default.findOneAndDelete({ _id: req.params.id }, (err, authors) => {
            res.status(201).json({ msg: " author deleted...." });
            if (err)
                return res.json(err);
            if (authors) {
                return res.json(authors);
            }
        });
    }
    catch (error) {
        console.log(error, "error occured");
    }
};
exports.deleteAuthor = deleteAuthor;
// export const getAllAuthors = (req: any, res: Response, next: NextFunction) => {
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             const data = readFile();
//             console.log("anita")
//             res.status(200).json({ message: 'succesfull', data: data })
//         }
//     });
// };
// export const getAuthorById = (req: any, res: Response, _next: NextFunction) => {
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             const data = readFile();
//             const authorData = data.find((item: author) => `${item.id}` === req.params.id)
//             if (!authorData) {
//                 return res.status(404).json({ message: `author not found` })
//             }
//             res.status(200).json({ message: "success", data: authorData })
//         }
//     });
// }
// export const postAuthor = (req: any, res: Response, _next: NextFunction) => {
//     const { error } = validateEntry(req.body)
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             if (error) {
//                 return res.status(400).send(error.details[0].message)
//             } else {
//                 const data = readFile();
//                 console.log(data, "data found")
//                 // const newBook = { ...req.body, books: getIdForBooks(req.body.books)  }
//                 const { author, age, address } = req.body
//                 // const newData = {id: data.length + 1, dateRegistered: new Date().getTime(), ...newBook};
//                 let newAuthor
//                 let allNewData
//                 if (data.length === 0) {
//                     newAuthor = {
//                         id: 1,
//                         author,
//                         age,
//                         address,
//                         dateRegistered: Date.now(),
//                         books: []
//                     }
//                     allNewData = [newAuthor]
//                     console.log(allNewData, "new data")
//                 } else {
//                     newAuthor = {
//                         id: data.length + 1,
//                         author,
//                         age,
//                         address,
//                         dateRegistered: Date.now(),
//                         books: []
//                     }
//                     allNewData = [...data, newAuthor];
//                 }
//                 console.log(allNewData, "DATA")
//                 writeFile(allNewData);
//                 res.status(201).json({ message: "create new book...", data: newAuthor })
//             }
//         }
//     });
// }
// export const updateAuthor = (req: any, res: Response, next: NextFunction) => {
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             const data = readFile();
//             const dataToUpdate = data.find((item: { item: author, id: number }) => `${item.id}` === req.params.id)
//             if (!dataToUpdate) {
//                 return res.status(404).json({ message: "does not exist" })
//             }
//             const newData = { ...dataToUpdate, ...req.body };
//             const dataIndex = data.findIndex((item: { id: number }) => `${item.id}` === req.params.id)
//             data.splice(dataIndex, 1, newData);
//             writeFile(data);
//             console.log(dataToUpdate);
//             res.status(201).json({ message: "author updated...", data: newData })
//         }
//     });
// }
// export const deleteAuthor = (req: any, res: Response, next: NextFunction) => {
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             const data = readFile();
//             const dataToDelete = data.find((item: { item: author, id: number }) => `${item.id}` === req.params.id);
//             if (!dataToDelete) {
//                 return res.status(404).json({ message: "not found" })
//             }
//             const dataIndex = data.findIndex((item: { item: author, id: number }) => `${item.id}` === req.params.id);
//             data.splice(dataIndex, 1)
//             writeFile(data);
//             res.status(200).json({ message: "Trashed!", data: data })
//         }
//     });
// }
// export default {
//     getAllAuthors,
//     getAuthorById,
//     postAuthor,
//     updateAuthor,
//     deleteAuthor
// }
