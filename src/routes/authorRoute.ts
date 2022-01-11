import express, {NextFunction, Request, Response} from 'express';


import * as authorController from '../controller/authorController';



import { checkAuth } from '../controller/usersController';


const router = express.Router();


router.post("/create_authors",authorController.create_authors);


router.get('/',authorController.getAllAuthors) 


router.put('/:id', authorController.updateAuthor)

router.get('/:id', authorController.getAuthorById)

router.delete('/:id',authorController.deleteAuthor)







// router.post('/', checkAuth, authorController.postAuthor)

// router.get('/:authorId/book/:bookId', getABook)
// router.post('/:authorId/add-book', postBook)
// router.put('/:authorId/book/:bookId', updateBook)
// router.delete('/:authorId/book/:bookId', deleteBook)


export default router;

// https://authorandbooks.herokuapp.com/author/1