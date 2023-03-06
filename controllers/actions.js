import express, { request, response } from "express";
const Router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from "../models/Account.js";
import Category from '../models/category.js';


Router.get('/getCategories', async(request, response) => {
    //OPTION 1
    //FIND ALL
    const categories = await Category.find();
    response.status(200).json({
        categories: categories
    })
    //FOND ALL BY CONDITION
    //const categories = await Category.find({isPublished: true});

    //FIND ONE BY ID
    //const categories = await Category.findById('6405a6f2597f06564e218c70');

    //FIND ONE BY CONDITION
    // const categories = await Category.findOne({})

})

Router.post('/createNewCategory', async(request, response) => {
    const id = mongoose.Types.ObjectId();
    const categoryName = request.body.categoryName;
    const _category = new Category({
        _id: id,
        categoryName: categoryName
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})


//AUTH FUNCTION

//REGISTER
Router.post('/register', async(request, response) => {
    //Get account info from body 
    const {firstname, lastname,email,password} = request.body;
    //Check if user (email) exist 
    const isAccountExist = await Account.findOne({email: email});
    if(isAccountExist){
        return response.status(200).json({
            message: 'Account exist'
        });
    }  
    //passowrd crypt
    const hash_password = await bcryptjs.hash(password,10);
    //create user in db
    const id = mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash_password
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {console.log(error.message)})
})

//LOGIN
Router.post('/login', async(request, response) => {})
    //Get account info from client
    const{email, password} = request.body
    //Check if user exist by email 
    Account.findOne({email: email})
    .then(async account => {
        if(!account){
            return response.status(200).json({
                message: 'Account not exist'
            });
        }

        //Compare password
        const isMatch = await bcryptjs.compare(password, account.password);
        if(!isMatch){
            return response.status(200).json({
                message: 'Password not match'
            });
        }
    
         //Generate JWT token
         const dataTOToken ={
            id:account._id,
            name: account.firstname + " " +account.lastname,
            email: account.email,
            avatar: account.avatar
         }
         const token = await jwt.sign({dataTOToken}, process.env.JWT_KEY, {expiresIn:'30d'});
         //Response
         return response.status(200).json({
            message: account,
            token: token
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })


export default Router;