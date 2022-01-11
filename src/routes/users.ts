import express, {NextFunction, Request, Response} from 'express';
import usersController from '../controller/usersController';
import { checkAuth } from '../controller/usersController';
const router = express.Router();



/* GET users listing. */

router.get("/", checkAuth, usersController.getAllUsers);
router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn)

// users
router.get("/user")




export default router;
