import express, {NextFunction, Request, Response} from 'express';
import{ getABook} from '../controller/bookController';
import { checkAuth } from '../controller/usersController';

const router = express.Router();

router.get('/:authorId/:bookId', getABook)
// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)


export default router;