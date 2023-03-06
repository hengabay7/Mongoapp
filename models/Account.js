import mongoose from "mongoose";
const Schema = mongoose.Schema;
import dotenv from 'dotenv';
dotenv.config();

const accountSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    avatar: {type: String, default: process.env.PICTURE },
    createdAt:{type: Date, default: Date.now}
})

export default mongoose.model('Account', accountSchema);