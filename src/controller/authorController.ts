import express, { Request, Response, NextFunction } from 'express';
import { author, validateEntry } from '../utils/utils';
import jwt from "jsonwebtoken"
const mySecret = 'ughyjkkoiughjkhu3jkhu748uhjki78h'
import mongoose from "mongoose"
import Author from "../models/authorModel"
import joi from "joi"


//get all authors

export const getAllAuthors = async (req:Request,res:Response)=>{
    try {

// Filtering
const queryObj = {...req.query}
const excludedFields = ['page','sort','limit', 'fields'];
excludedFields.forEach(el => delete queryObj[el])

let query =  Author.find(queryObj);

// Pagination
const page = +req.query.page! || 1
const limit = +req.query.limit! || 5
const numAuthors= await Author.countDocuments()
const skip = (page - 1) * limit
const numberOfPages = Math.ceil(numAuthors/limit)
const previous =  page - 1;
const next = page >= numberOfPages ? 0 : page + 1;
query = query.skip(skip).limit(limit)

// Execute query
    const authors = await query

    res.status(200).json({
        status: 'success',
        result: authors.length,
        prev: previous,
        next: next,
        data: authors
    })

} catch (error) {
         console.log(error, "error occured")
         res.status(500).json({error})
    }
}

//create authors details


export const create_authors = async(req:Request, res:Response)=>{
try {
     
    const {error} =  validateEntry(req.body);
    if(error){
        return res.status(401).json({msg:" Validation failed"})
    }

    const {author_name, age, address} = req.body

console.log(author_name)

    await Author.create({
        author_name,
        age,
        address
    })

    res.status(201).json({msg:" author saved...."})

} catch (error) {
     console.log(error, "error occured.")
     res.status(500).json({msg: "Server error occured"})
    
}

}



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

export async function updateAuthor(req: Request, res: Response){
    const {  author_name, age, address } = req.body
    const { id } = req.params
    const author = await Author.findOne({_id: id})
    if(!author){
        res.status(404).json({
            error: 'Author not found'
        })
    }
    author_name && (author!.author_name = author_name)
    age && (author!.age = age)
    address && (author!.address = address)
    const updatedAuthor = await author!.save()
    res.json({
        msg: 'Updated successfully',
        updatedAuthor: updatedAuthor
    })
}


//get author by id


export const getAuthorById =(req:Request,res:Response)=>{

//catch error from request body
try {
    
    Author.findById(req.params.id,(err:any, authors:string)=>{
    
    if(err) return res.json(err);

    if(authors){
 
    return res.json(authors)  
    }

    })
} catch (error) {
    console.log(error, "error occured")
    res.status(500).json({error});
    
}

 
}

// delete Author

export const deleteAuthor = (req: Request, res: Response) => {

    try {
        
    Author.findOneAndDelete({_id:req.params.id}, (err:any, authors:string)=>{
    res.status(201).json({msg:" author deleted...."})
    if(err) return res.json(err);

    if(authors){
 
    return res.json(authors)  
    }

    })
    } catch (error) {
        console.log(error, "error occured")
    }
}





// const queryObj = {...req.query}
// const excludedFields = ['page','sort','limit', 'fields'];
// excludedFields.forEach(el => delete queryObj[el]))
// let query =  Author.find(queryObj);
// // Pagination
// const page = +req.query.page || 1
// const limit = req.query.limit || 3
// const skip = (page - 1) * limit
// query = query.skip(skip).limit(limit)

// if(req.query.page){
//     const numAuthors = await Author.countDocuments()
//     if(skip > numAuthors) throw new Error('This page doesnt exist')
// }

// // Execute query
// const authors = await query



