"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = __importDefault(require("../controller/authorController"));
const router = express_1.default.Router();
router.get('/', authorController_1.default.getAllAuthors);
router.get('/:id', authorController_1.default.getAuthorById);
router.post('/', authorController_1.default.postAuthor);
router.put('/:id', authorController_1.default.updateAuthor);
router.delete('/:id', authorController_1.default.deleteAuthor);
// router.get('/:authorId/book/:bookId', getABook)
// router.post('/:authorId/add-book', postBook)
// router.put('/:authorId/book/:bookId', updateBook)
// router.delete('/:authorId/book/:bookId', deleteBook)
exports.default = router;
// https://authorandbooks.herokuapp.com/author/1
