"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import usersController from '../controller/usersController';
const usersController_1 = require("../controller/usersController");
// import { checkAuth } from '../controller/usersController';
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", usersController_1.getAllUsers);
// router.get("/", checkAuth, usersController.getAllUsers);
// router.post("/signup", usersController.signUp);
// router.post("/login", usersController.logIn)
// users
router.get("/user");
exports.default = router;
