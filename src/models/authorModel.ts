import mongoose from "mongoose";

    export  const authorSchema = new mongoose.Schema({
    author_name: {
        type: String,
        required: [true, 'An author must have a name'],
        unique: true},

    age: {
         type: Number
         },

    address: {type: String,
    required: [true, 'An author must have a name'],
        unique: true } ,

    
},
{timestamps: true}

)

const Author = mongoose.model('Author', authorSchema)



export default Author