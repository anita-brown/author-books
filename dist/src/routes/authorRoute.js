"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controller/authorController");
const usersController_1 = require("../controller/usersController");
const router = express_1.default.Router();
router.get('/', usersController_1.checkAuth, authorController_1.getAllAuthors);
router.get('/:id', usersController_1.checkAuth, authorController_1.getAuthorById);
router.post("/create_authors", usersController_1.checkAuth, authorController_1.create_authors);
router.put('/:id', usersController_1.checkAuth, authorController_1.updateAuthor);
router.delete('/:id', usersController_1.checkAuth, authorController_1.deleteAuthor);
exports.default = router;
// https://authorandbooks.herokuapp.com/author/1
