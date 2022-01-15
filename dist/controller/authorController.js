"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.getAuthorById = exports.updateAuthor = exports.create_authors = exports.getAllAuthors = void 0;
const utils_1 = require("../utils/utils");
const mySecret = 'ughyjkkoiughjkhu3jkhu748uhjki78h';
const authorModel_1 = __importDefault(require("../models/authorModel"));
//get all authors
const getAllAuthors = async (req, res) => {
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        let query = authorModel_1.default.find(queryObj);
        // Pagination
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 5;
        const numAuthors = await authorModel_1.default.countDocuments();
        const skip = (page - 1) * limit;
        const numberOfPages = Math.ceil(numAuthors / limit);
        const previous = page - 1;
        const next = page >= numberOfPages ? 0 : page + 1;
        query = query.skip(skip).limit(limit);
        // Execute query
        const authors = await query;
        res.status(200).json({
            status: 'success',
            result: authors.length,
            prev: previous,
            next: next,
            data: authors
        });
    }
    catch (error) {
        console.log(error, "error occured");
        res.status(500).json({ error });
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
        const data = await authorModel_1.default.create({
            author_name,
            age,
            address
        });
        res.status(201).json({ status: "success", message: "author saved....", data });
    }
    catch (error) {
        // console.log(error, "error occured.")
        res.status(500).json({ msg: "Server error occured" });
    }
};
exports.create_authors = create_authors;
// update author
// export const updateAuthor=(req:Request,res:Response)=>{
// //catch error from request body
// try {
//     const author = Author.findOneAndUpdate({_id:req.params.id}, req.body, {
//         new: true})
//     if(!author){
//         return res.status(401).json({message: `author with id ${req.params.id} does not exist`})  
//     }
//     console.log(author)
//     res.status(201).json({msg:" author updated...."})
//     } 
//     catch (error) {
//         console.log(error, "error occured")
//      res.status(500).json({error})
//     }
// }
async function updateAuthor(req, res) {
    const { author_name, age, address } = req.body;
    const { id } = req.params;
    const author = await authorModel_1.default.findOne({ _id: id });
    if (!author) {
        res.status(404).json({
            error: 'Author not found'
        });
    }
    author_name && (author.author_name = author_name);
    age && (author.age = age);
    address && (author.address = address);
    const data = await author.save();
    res.status(201).json({
        status: "success",
        message: 'Updated successfully',
        data
    });
}
exports.updateAuthor = updateAuthor;
//get author by id
const getAuthorById = (req, res) => {
    //catch error from request body
    try {
        authorModel_1.default.findById(req.params.id, (err, authors) => {
            if (authors) {
                return res.status(200).json({ status: "success" });
            }
        });
    }
    catch (error) {
        console.log(error, "error occured");
        res.status(500).json({ error });
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
