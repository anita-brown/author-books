import express, {NextFunction, Request, Response} from 'express';

import{  getAllUsers, signUp, logIn} from '../controller/usersController';

const router = express.Router();



/* GET users listing. */
router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", logIn);


// users
router.get("/user")




export default router;
