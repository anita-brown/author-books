import express, {NextFunction, Request, Response} from 'express';


import {getAllAuthors, getAuthorById, create_authors, updateAuthor, deleteAuthor} from '../controller/authorController';


import { checkAuth } from '../controller/usersController';


const router = express.Router();

router.get('/', checkAuth, getAllAuthors) 

router.get('/:id', checkAuth,getAuthorById)

router.post("/create_authors",checkAuth,create_authors);

router.put('/:id', checkAuth,updateAuthor)


router.delete('/:id',checkAuth,deleteAuthor)




export default router;

// https://authorandbooks.herokuapp.com/author/1