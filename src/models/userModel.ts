import mongoose from "mongoose"

import bcrypt from "bcrypt";

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
        select: false
    }


},
    { timestamps: true }

)
// 
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10);
})
const User = mongoose.model('User', userSchema)



export default User;