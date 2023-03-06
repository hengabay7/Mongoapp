import express from "express";
import mongoose from "mongoose";
import action from './controllers/actions.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;

app.use('/api', action);

mongoose.connect(mongo_url)
.then(results => {
    console.log(results);
})
.catch(error => {
    console.log(error);
})

app.listen(port, function(){
    console.log(`Server is running via port ${port}`);
})
