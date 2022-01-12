import express, {NextFunction, Request, Response} from 'express';
import{ getABook, create_book, updateBook, deleteBook} from '../controller/bookController';
// import { checkAuth } from '../controller/usersController';

const router = express.Router();

router.get('/', getABook)
 router.post('/', create_book)
 router.put('/:id', updateBook)
 router.delete('/:id', deleteBook)

// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)


export default router;