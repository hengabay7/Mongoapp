import express, { request, response } from "express";
const Router = express.Router();
import mongoose from "mongoose";
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


//Delete category from DB
Router.delete('/deleteCategory/id', async(request, response) =>{
    //GET PARAMTERS
    const id = request.params.id;
    Category.findByIdAndDelete(id)
    .then(category_updated => {
        return response.status(200).json({
            message: category_updated
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })

})

//Delete category with all products

//Update category from DB
Router.put('/updateCategory/:id', async(request,response) => {
    //GET PARAMTERS
    const id = request.params.id;
    const {categoryName,isPublished} = request.body;
    
    //FIND CATEGORY IN DB
    Category.findById(id)
    .then(category =>{
        if(category){
            
            category.categoryName = categoryName;
            category.isPublished = isPublished;
            category.save()
            .then(category_updated =>{
                return response.status(200).json({
                    message: category_updated
                })
            })
            .catch(error => {
                return response.status(500).json({
                    message: error.message
                })
            })

        } else {
            return response.status(200).json({
                message: 'Category not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})


//Update multuple product 


//Uptate for product
Router.put('/updateProduct/:id', async(request,response) => {
    //GET PARAMTERS
    const id = request.params.id;
    const {productName,productPrice} = request.body;
    
    //FIND CATEGORY IN DB
    Product.findById(id)
    .then(product =>{
        if(product){
            
            product.productName = productName;
            product.productPrice = productPrice;
            product.save()
            .then(produc_updated =>{
                return response.status(200).json({
                    message: produc_updated
                })
            })
            .catch(error => {
                return response.status(500).json({
                    message: error.message
                })
            })

        } else {
            return response.status(200).json({
                message: 'produc not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})

//Delete product
Router.delete('/deleteProduct/:id', async(request, response) => {
    //GET PARAMTERS
    const id = request.params.id;
    Product.findByIdAndDelete(id)
    .then(product_updated => {
        return response.status(200).json({
            message: product_updated
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })

})



Router.post('/sendMessageToProduct/:id', Auth,async(request,response) => {
    //GET SENDER DATA
    const user = request.user;
    //GET THE PRODUCT ID
    const id  =request.params.id;
    //GET MESSAGE
    const  {msgTitle,msgContent} = request.body;
    //FIND PRODUCT BY ID
    const product = await Product.findById(id);

    //CREATE OBJECT FOR MESSAGE
    const _message = {
        msgTitle: msgTitle,
        msgContent: msgContent,
        associateSender: user, id
    }

    product.messages.push(_message);
    product.save()
    .then(message_created => {
        return response.status(200).json({
            message: message_created
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})




export default Router;
