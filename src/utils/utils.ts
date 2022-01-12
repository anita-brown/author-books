import fs from 'fs';
import path from 'path';
import Joi from 'joi';
import {Request} from 'express';
import mongoose from "mongoose"

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

export const validateEntry = (Author: author) => {
    const schema = Joi.object({
        author_name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required()
       
    }).unknown();
    return schema.validate(Author)
}

export const validateBookEntry = (Book: books) => {
    const schema = Joi.object({
        authorId: Joi.string().required(),
        bookname:  Joi.string().required(),
        isPublished: Joi.boolean().required(),
        datePublished: Joi.number().required(),
        serialNumber: Joi.number().required()
  
    }).unknown();
    return schema.validate(Book)
}


// const Joi = require('joi');

// const validateRequest = (schema) => async (req, res, next) => {
//     const { error } = Joi.validate(req.body, schema);

//     if (error) {  
//       throw new Error(error);
//     }

//     return next();
//   };

// const validatinSchema =  Joi.object().keys({
//     firstName:  Joi.string().required(),
//     lastName: Joi.string().required(),
//   }),

// export const readFile = () => {
//     try{
//         const data = fs.readFileSync(myFilePath, {encoding:'utf8'})
//         console.log(data)
//         return JSON.parse(data);
        
//     }catch(error){
//         console.log(error, "error occured")
//         return []
//     }
    
// }


// export const writeFile = (data: author[]) =>{
//         fs.writeFileSync(myFilePath, JSON.stringify(data, null, 4));

// }
    
// export function getIdForBooks (booksData: books[]): books[] {
//     return booksData.map((book: books, index) => {
//         return {id:`book${index + 1}`, ...book}
//     })
// }




// Typescript interfaces for author, books and Users
export interface author extends mongoose.Document {
    id: string,
    author_name: string,
    age: number,
    address: string,
}


export interface books extends mongoose.Document {
    Id: string,
    bookname: string,
    isPublished: boolean,
    datePublished: Date | null,
    serialNumber: number|null
}
export interface users extends mongoose.Document{
    firstName : string,
    lastName: string,
    DOB: Date,
    email: string,
    phoneNumber: number,
    password: string,
}
export interface login {
    email: string;
    password: string;
}
export interface sign {
    firstName : string,
    lastName: string,
    DOB: Date,
    email: string,
    phoneNo: number,
    password: string,
}
export interface reqUser extends Request {
  user?: string
}