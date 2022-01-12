import mongoose from "mongoose"


export const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'An author must have a first name'],

    },

    lastName: {
        type: String,
        required: [true, 'An author must have a last name'],
    
    },

    DOB: {
        type: String,
        required: [true, 'An author must have a valid DOB']

    },
    email: {
        type: String,
        required: [true, 'An author must have a valid email'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'An author must have a valid phone number'],
        unique: true
    
    },
    password: {
        type: String,
        required: [true, 'Put in strong password'],
    }


},
    { timestamps: true }

)

const User = mongoose.model('User', userSchema)



export default User;