import express, { Request, Response, NextFunction } from 'express';
import { author, validateEntry } from '../utils/utils';
import jwt from "jsonwebtoken"
const mySecret = 'ughyjkkoiughjkhu3jkhu748uhjki78h'
import mongoose from "mongoose"
import Author from "../models/authorModel"
import joi, { string } from "joi"


//get all authors

export const getAllAuthors = async (req: Request, res: Response) => {
    try {

        // Filtering
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])

        let query = Author.find(queryObj);

        // Pagination
        const page = +req.query.page! || 1
        const limit = +req.query.limit! || 5
        const numAuthors = await Author.countDocuments()
        const skip = (page - 1) * limit
        const numberOfPages = Math.ceil(numAuthors / limit)
        const previous = page - 1;
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
        res.status(500).json({ error })
    }
}

//create authors details


export const create_authors = async (req: Request, res: Response) => {
    try {


        const { error } = validateEntry(req.body);
        if (error) {
            return res.status(401).json({ msg: " Validation failed" })
        }

        const { author_name, age, address } = req.body


        const data = await Author.create({
            author_name,
            age,
            address
        })

        res.status(201).json({ status: "success", message: "author saved....", data })

    } catch (error) {
        // console.log(error, "error occured.")
        res.status(500).json({ msg: "Server error occured" })

    }

}


export async function updateAuthor(req: Request, res: Response) {
    try {


        const { author_name, age, address } = req.body
        const { id } = req.params
        const author = await Author.findOne({ _id: id })
        if (!author) {
            res.status(404).json({
                error: 'Author not found'
            })
        }
        author_name && (author!.author_name = author_name)
        age && (author!.age = age)
        address && (author!.address = address)
        const data = await author!.save()
        res.status(201).json({
            status: "success",
            message: 'Updated successfully',
            data
        })

    } catch (error) {
        // console.log(error, "error occured")
        res.status(500).json({ error });

    }
}


//get author by id


export const getAuthorById =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await Author.findById({ _id: id })
        
        res.status(201).json({status: "success", data})
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

// delete Author

export const deleteAuthor = (req: Request, res: Response) => {

    try {

        Author.findOneAndDelete({ _id: req.params.id }, (err: any, authors: author) => {
            if (err) return res.json(err);

            if (authors) {


                return res.status(201).json({ status: "success", message: " author deleted....", authors })
            }

        })
    } catch (error) {
        console.log(error, "error occured")
    }
}





