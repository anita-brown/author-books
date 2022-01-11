"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController = __importStar(require("../controller/authorController"));
const router = express_1.default.Router();
router.post("/create_authors", authorController.create_authors);
router.get('/', authorController.getAllAuthors);
router.put('/:id', authorController.updateAuthor);
router.get('/:id', authorController.getAuthorById);
router.delete('/:id', authorController.deleteAuthor);
// router.post('/', checkAuth, authorController.postAuthor)
// router.get('/:authorId/book/:bookId', getABook)
// router.post('/:authorId/add-book', postBook)
// router.put('/:authorId/book/:bookId', updateBook)
// router.delete('/:authorId/book/:bookId', deleteBook)
exports.default = router;
// https://authorandbooks.herokuapp.com/author/1
