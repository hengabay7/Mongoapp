import express from "express";
import mongoose from "mongoose";

import dotenv from 'dotenv';

import accountRouter from './controllers/account.js';
import productRoute from './controllers/product.js';
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;

//Account
app.use('/api/account', accountRouter);

//Products
app.use('/api/product', productRoute)

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
