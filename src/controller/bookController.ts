import express, { Request, Response, NextFunction } from 'express';
// import { readFile, writeFile, author } from '../utils/utils';
import { validateEntry } from '../utils/utils';
import jwt from "jsonwebtoken"
const mySecret = 'ughyjkkoiughjkhu3jkhu748uhjki78h'
import Book from '../models/bookModel';


//get all books

export const getABook =(req:Request,res:Response)=>{
    try {
       
   
    Book.find({},(err:any, books:any)=>{
    
    if(err) return res.json({msg:"error occur in getting all authors book..."});

    if(books){

     res.json(books)
    }
    })
    } catch (error) {
         console.log(error, "error occured")
    }

}



// create book


export const create_book = async(req:Request, res:Response)=>{
try {
     
    const {error} =  validateEntry(req.body);
    if(error){
        return res.status(401).json({msg:" Validation failed"})
    }

    const {author_name, age, address} = req.body

console.log(author_name)

    await Book.create({
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





// export const updateAuthor=(req:Request,res:Response)=>{

// //catch error from request body
// try {

//     Author.findByIdAndUpdate(req.params.id, req.body,(err:any, authors:any)=>{

//     res.status(201).json({msg:" author updated...."})
    
//     if(err) return res.json(err);

//     if(authors){
 
//     return res.json(authors)  
//     }

//     })
    
// } catch (error) {
//      console.log(error, "error occured")
// }

// }










// export const getABook = (req: any, res: Response, next: NextFunction) => {

//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {
//             const data = readFile();
//             const authorData = data.find((item: author) => `${item.id}` === req.params.authorId);
//             if (!authorData) {
//                 return res.status(404).json({ message: `author with the id ${req.params.authorId} not found!` })
//             }
//             const bookData = authorData.books.find((item: author) => `${item.id}` === req.params.bookId)
//             if (!bookData) {
//                 return res.status(404).json({ message: `book with the id ${req.params.bookId} not found` })
//             }
//             res.status(200).json({ mesaage: "success", data: bookData })

//         }
//     });


// }


// export const postBook = (req: any, res: Response) => {

//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {

//             const data = readFile();

//             let authorFind = data.find(((item: { item: author, id: number }) => `${item.id}` === req.params.authorId));
//             const authorIndex = data.findIndex((item: { item: author, id: number }) => `${item.id}` === req.params.authorId)

//             if (!authorFind) {

//                 return res.status(404).json({ message: "author does not exist" })

//             }

//             const { name, isPublished, datePublished, serialNumber } = req.body
//             let bookId
//             if (authorFind.books.length === 0) {
//                 bookId = 'book1'
//             } else {
//                 bookId = `book${authorFind.books.length + 1}`
//             }

//             const newBook = {
//                 id: bookId,
//                 name,
//                 isPublished,
//                 datePublished: datePublished || null,
//                 serialNumber: serialNumber || null
//             }

//             authorFind = {

//                 ...authorFind,

//                 books: [...authorFind.books, newBook]
//             }

//             data[authorIndex] = authorFind
//             writeFile(data);

//             res.status(201).json({ message: "new book added", author: authorFind })


//         }
//     });


// }

// export const updateBook = (req: any, res: Response, next: NextFunction) => {
//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {

//             const data = readFile();
//             const authorFind = data.find((item: { item: author, id: number }) => `${item.id}` === req.params.authorId);
//             if (!authorFind) {
//                 return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` })
//             }
//             const bookToUpdate = authorFind.books.find((item: { item: author, id: number }) => `${item.id}` === req.params.bookId)
//             if (!bookToUpdate) {
//                 return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` })
//             }
//             const newData = { ...bookToUpdate, ...req.body };
//             const dataIndex = authorFind.books.findIndex((item: author) => `${item.id}` === req.params.bookId)
//             authorFind.books.splice(dataIndex, 1, newData);

//             writeFile(authorFind)
//             res.status(201).json({ message: "book updated...", data: newData })
//         }

//     }
//     )
// };


// export const deleteBook = (req: any, res: Response, next: NextFunction) => {

//     jwt.verify(req.token, mySecret, (err: any, data: any) => {
//         if (err) {
//             console.log(req.token);
//             res.sendStatus(403);
//         } else {

//             const data = readFile();
//             const authorFind = data.find((item: { item: author, id: number }) => `${item.id}` === req.params.authorId);
//             if (!authorFind) {
//                 return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` })
//             }
//             const bookToDelete = authorFind.books.find((item: { item: author, id: number }) => `${item.id}` === req.params.bookId)
//             if (!bookToDelete) {
//                 return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` })
//             }
//             const dataIndex = authorFind.books.findIndex((item: { item: author, id: number }) => `${item.id}` === req.params.id);
//             authorFind.books.splice(authorFind.books, 1);
//             writeFile(data);
//             res.status(200).json({ message: `Book with the id ${req.params.bookId} has been trashed...` })
//         }
//     });
// }

// export default {
//     getABook,
//     postBook,
//     updateBook,
//     deleteBook
// }