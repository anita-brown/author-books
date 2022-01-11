"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("./post"));
const bookController_1 = require("../controller/bookController");
post_1.default.get('/book/:bookId', bookController_1.getABook);
post_1.default.post('/:authorId/add-book', bookController_1.postBook);
post_1.default.put('/:authorId/book/:bookId', bookController_1.updateBook);
post_1.default.delete('/:authorId/book/:bookId', bookController_1.deleteBook);
exports.default = post_1.default;
