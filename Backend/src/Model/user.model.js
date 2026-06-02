import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already taken"],   
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Account already Exist with this email"]
    },
    password: {
        type: String,
        required: true,
    },
   
});

const usermodel = mongoose.model('User', userSchema);  

export default usermodel;