import mongoose from 'mongoose';

const tokenblacklistSchema = new mongoose.Schema({
    token :{
        type: String,
        required: [true,"Token is required"],
    }},
    {    timestamps: true});

const tokenblacklist = mongoose.model('Blacklist', tokenblacklistSchema);
export default tokenblacklist