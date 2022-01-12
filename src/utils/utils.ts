import Joi from 'joi';
import {Request} from 'express';
import mongoose from "mongoose"


//  Author validation with joi
export const validateEntry = (Author: author) => {
    const schema = Joi.object({
        author_name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required()
       
    }).unknown();
    return schema.validate(Author)
}

//  Book validation with joi
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

//  User validation with joi
export const validateUserEntry = (User: users) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName:  Joi.string().required(),
        DOB: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string().required().min(8)
  
    }).unknown();
    return schema.validate(User)
}
export const validateloginEntry = (User: login) => {
    const schema = Joi.object({
       email: Joi.string().required(),
        password: Joi.string().required().min(8)
  
    }).unknown();
    return schema.validate(User)
}


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