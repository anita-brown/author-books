"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
router.get('/:authorId/:bookId', bookController_1.getABook);
// router.post('/:authorId/:bookId', checkAuth, postBook)
// router.put('/:authorId/:bookId', checkAuth, updateBook)
// router.delete('/:authorId/:bookId',checkAuth, deleteBook)
exports.default = router;
