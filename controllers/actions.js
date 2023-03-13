import express, { request, response } from "express";
const Router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from "../models/Account.js";
import Category from '../models/category.js';
import Auth from './auth.js'
import Product from "../models/product.js";



Router.get('/getProductsByCategoryId/:id', Auth, async(request,response) => {
    const cid= request.params.id;
    Product.find({associateCategory: cid})
    .populate('associateAccount')
    .populate('associateCategory')
    .then(allProducts => {
        return response.status(200).json({
            message: allProducts
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})



Router.get('/getAllProducts' ,Auth, async(request,response) => {
    const cid= request.params.id;
    Product.find({associateCategory: cid})
    Product.find()
    .populate('associateAccount')
    .populate('associateCategory')
    .then(allProducts => {
        return response.status(200).json({
            message: allProducts
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})

Router.post('/addProduct',Auth ,async(request,response) => {
    const {
        associateCategory,
        productName,
        productPrice,
        productDescription,
        productImage,
        productStatus
    } = request.body;

    const id = mongoose.Types.ObjectId();

    const _product = new Product({
        _id: id,
        associateAccount: request.user._id,
        associateCategory: associateCategory,
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        productImage: productImage,
        productStatus: productStatus
    });
    _product.save()
    .then(product_added => {
        return response.status(200).json({
            message: product_added
        });
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        });
    })
})


Router.get('/getCategories', async (request,response) => {
    //find ALL
    const categories = await Category.find();
        response.status(200).json({
        categories: categories
    })

    //find Where
    // const categories = await Category.find({isPublished:false});
    //     response.status(200).json({
    //     categories: categories
    // })

    //find BYID
    // const categories = await Category.findById('6405ada197870b9bd7a54c3f');
    //     response.status(200).json({
    //     categories: categories
    // })

    //find one by condition
    // const categories = await Category.findOne({isPublished:false})
    //     response.status(200).json({
    //     categories: categories
    // })
})

Router.post('/createNewCategory', async(request,response) => {
    const id = new mongoose.Types.ObjectId();
    const categoryName = request.body.categoryName;
    const _category = new Category({
        _id:id,
        categoryName:categoryName
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {
        console.log(error)
    })
})

//AUTH FUNCTIONS

//REGISTER
Router.post('/register', async(request,response) => {
    //1.GET account info from body
    const {firstName,lastName,email,password} = request.body;

    //2.CHECK if user (email) exist
    const isAccountExist = await Account.findOne({email: email});
    if(isAccountExist){
        return response.status(200).json({
            message: 'Account exist'
        });
    }

    //3.password crypt
    const hash_password = await bcryptjs.hash(password,10);

    //4.create user in db 
    const id = new mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash_password
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {
        console.log(error)
    })

})

//LOGIN
Router.post('/login', async(request,response) => {
    //get account info from client 
    const {email,password} = request.body;

    //check if user exist by email
    Account.findOne({email: email})
    .then(async account => {
        if(!account){
            return response.status(200).json({
                message: 'Account not exist'
            });
        }

        //compare password    
        const isMatch = await bcryptjs.compare(password,account.password)
        if (!isMatch){
            return response.status(200).json({
                message: 'password not match'
            });
        }

        //generate JWT token 
        const dataToToken = {
            id: account.id,
            name: account.firstName + " " + account.lastName,
            email: account.email,
            avatar: account.avatar
        }
        const token = await jwt.sign( {dataToToken} , process.env.JWT_KEY , {expiresIn:'30d'});
        
        //Response
        return response.status(200).json({
            message: account,
            token: token
        });

    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })

})

export default Router;
