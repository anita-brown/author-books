"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
// import { checkAuth } from '../controller/usersController';
const router = express_1.default.Router();
router.get('/', bookController_1.getABook);
router.post('/', bookController_1.create_book);
router.put('/:id', bookController_1.updateBook);
router.delete('/:id', bookController_1.deleteBook);
// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)
exports.default = router;
