"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controller/usersController");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", usersController_1.getAllUsers);
router.post("/signup", usersController_1.signUp);
router.post("/login", usersController_1.logIn);
// users
router.get("/user");
exports.default = router;
