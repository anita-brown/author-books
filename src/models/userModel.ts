import mongoose from "mongoose"


export const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'An author must have a first name'],
        unique: true
    },

    lastName: {
        type: String,
        required: [true, 'An author must have a last name'],
        unique: true
    },

    DOB: {
        type: String,
        required: [true, 'An author must have a valid DOB'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'An author must have a valid email'],
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: [true, 'An author must have a valid phone number'],
        unique: true
    }


},
    { timestamps: true }

)

const User = mongoose.model('User', userSchema)



export default User;