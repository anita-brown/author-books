"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const usersController_1 = require("../controller/usersController");
const router = express_1.default.Router();
router.get('/', usersController_1.checkAuth, bookController_1.getAllBooks);
router.post('/', usersController_1.checkAuth, bookController_1.create_book);
router.put('/:id', usersController_1.checkAuth, bookController_1.updateBook);
router.delete('/:id', usersController_1.checkAuth, bookController_1.deleteBook);
// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)
exports.default = router;
