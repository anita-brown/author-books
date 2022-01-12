import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
    authorId: {type:String,},
    bookname: {
        type: String,
        required: [true, 'An author must have a bookname'],
        unique: true
    },
    isPublished: {
        type: Boolean,

    },

    datePublished: {
        type: String,

    },

    serialNumber: {
        type: Number,
        required: [true, 'A book must have a serialNumber'],
        unique: true
    },


},
    { timestamps: true }

)

const Book = mongoose.model('Book', bookSchema)



export default Book;