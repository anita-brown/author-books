import express, { NextFunction, Request, Response } from 'express';
import { getAllBooks, create_book, updateBook, deleteBook } from '../controller/bookController';
import { checkAuth } from '../controller/usersController';

const router = express.Router();

router.get('/', checkAuth, getAllBooks)
router.post('/', checkAuth, create_book)
router.put('/:id', checkAuth, updateBook)
router.delete('/:id', checkAuth, deleteBook)

// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)


export default router;