const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");
const User = require("../models/userModel");
var ObjectId = require('mongodb').ObjectId;

//@desc Create a product
//@route POST /api/products/create
//@access public
const createProduct = asyncHandler(async (req,res)=> {
    const {name, description, price, sale,seller, category, path_url, rating, reviews} = req.body;
    if (!name || !description || !price || !seller || !category || !path_url) {
        res.status(400)
        throw new Error("All fields mandatory!")
    }
    const productExists = await Product.findOne({name})
    if (productExists) {
        res.status(400)
        throw new Error("This product seems to already exists.")
    }
    const product = await Product.create({
            name,
            description,
            price,
            sale,
            seller,
            category,
            path_url,
            rating,
            reviews
        });
        console.log(product)
    if (product) {
        res.status(201).json({_id: product.id, name: product.name, path_url: product.path_url})
    } else {
        res.status(400)
        throw new Error("Product data was invalid, error occurred.")
    }
    res.json({message:"Create the product"})
})

const updateProduct = asyncHandler(async (req, res) => {
    const {productId, name, description, price, sale, seller, category} = req.body;
    const product = await Product.findById(productId);
    console.log(productId, name, description, price, sale, seller, category)

    // If product exists
    if (product) {
      product._id = productId
      product.name = name || product.name
      product.description =  description || product.description
      product.price = price || product.price
      product.sale = sale || product.sale
      product.seller = seller || product.seller
      product.category = category || product.category
      const updatedProduct = await product.save();

      if (updatedProduct) {
        const updatedProducts = await Product.find({})
          return res.status(200).json(updatedProducts);
      }
    }
    else {
      res.status(404)
      throw new Error("product not found!")
    }
  
  });

const getProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({})
    if (products) {
        res.status(200).json({products})
    }
    else {
        res.status(400)
        throw new Error("Could not retrieve products.")
    }
})
//@desc Get a product by ID
//@route POST /api/products/byID
//@access public
const getByID = asyncHandler(async (req,res)=> {
    const {productID} = req.body;

    if (!productID) {
        res.status(400)
        throw new Error("You did not send a product id.")
    }

    const product = await Product.find({_id: productID})

    if (product) {
        res.status(200).json(product)
    }
})
//@desc Get a product by category
//@route POST /api/products/byCategory
//@access public
const getCategory = asyncHandler(async (req,res) => {
    const {category} = req.body;
    let product
    if (!category) {
        res.status(400)
        throw new Error("You did not send a category.")
    }
    if (category === "All") {
        product = await Product.find()
        console.log(product)
    }
    else {
        product = await Product.find({category: category})
        console.log(product)
    }

    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("No products found with this category.")
    }
})

//@desc Get a product by sale
//@route POST /api/products/bySale
//@access public
const getSale = asyncHandler(async (req,res) => {

    const product = await Product.find({sale:{$exists:true}})

    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("No products found with an active sale.")
    }
})

//@desc Get a product by recommended
//@route POST /api/products/byRecommended
//@access public
const getRecommended = asyncHandler(async (req,res) => {

    const product = await Product.find({recommended:{$exists:true}})

    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("No products found with a active recommondation.")
    }
})

//@desc Get a product by top brands
//@route POST /api/products/byTopBrands
//@access public
const getTopBrands = asyncHandler(async (req,res) => {

    const product = await Product.find({top_brand:{$exists:true}})

    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("No products found within top brands.")
    }
})

//@desc Get a product by most selling
//@route POST /api/products/byMostSelling
//@access public
const getMostSelling = asyncHandler(async (req,res) => {

    const product = await Product.find().sort({orders:-1}).limit(1)

    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("No products found with a active recommondation.")
    }
})

//@desc Insert product into user's cart
//@route POST /api/products/addToCart
//@access public
const addToCart = asyncHandler(async (req,res) => {
    const {productId,userId} = req.body;
    const product = await Product.find({productId})

    if (product) {
        const updatedUser = await User.findById(userId).updateOne({$push:{cart: productId}})
        if (updatedUser) {
            res.status(200).json(updatedUser)
        }
    }
    else {
        res.status(400)
        throw new Error("No products found with this product id.")
    }
})

//@desc Insert product into user's saved
//@route POST /api/products/addToSaved
//@access public
const addToSaved = asyncHandler(async (req,res) => {
    const {productId,userId} = req.body;
    const product = await Product.find({productId})

    if (product) {
        const updatedUser = await User.findById(userId).updateOne({$push:{saved: productId}})
        if (updatedUser) {
            res.status(200).json(updatedUser)
        }
    }
    else {
        res.status(400)
        throw new Error("No products found with this product id.")
    }
})

//@desc Remove product from user's saved
//@route POST /api/products/removeToSaved
//@access public
const removeToSaved = asyncHandler(async (req,res) => {
    const {productId,userId} = req.body;
    const product = await Product.find({productId})

    if (product) {
        const updatedUser = await User.findById(userId).updateOne({$pull: {saved: productId}})
        if (updatedUser) {
            res.status(200).json(updatedUser)
        }
    }
    else {
        res.status(400)
        throw new Error("No products found with this product id.")
    }
})


const getSaved = asyncHandler(async (req,res)=> {
    const {userId} = req.body;
    const productIds = await User.find({_id:userId}, 'saved')
    if (productIds) {
        const products = await Product.find({_id:productIds[0].saved})
        res.status(200).json(products)
    }
})

const getCart = asyncHandler(async (req,res)=> {
    const {userId} = req.body;
    const productIds = await User.find({_id:userId})
    if (productIds) {
        const products = await Product.find({_id: productIds[0].cart})
        res.status(200).json(products)
    }
})

const getPurchaseHistory = asyncHandler(async (req,res)=> {
    const {userId} = req.body;

    const products = await User.find({_id:userId}, 'past_orders')
    if (products) {
        res.status(200).json(products)
    }
})


const getSavedById = asyncHandler(async (req,res) => {
    const {productId,userId} = req.body;
    const product = await Product.find({productId})
    if (product) {

        const updatedUser = await User.find({_id:userId, saved: productId})

    if (updatedUser.length) {
            res.status(200).json(updatedUser)
        }
        else {
            res.status(400)
            throw new Error("User does not have this item saved.")
        }
    }
    else {
        res.status(400)
        throw new Error("No products found with this product id.")
    }
})

const searchFor = asyncHandler(async (req,res)=> {
    const {query,remove} = req.body;
    let products
    console.log(remove)
    if (remove) {
        // Works when passsing only one thing to remove
        // products = await Product.find({name: {$regex: query, $options:'i'}, seller: {$nor: remove}})


        // Working just needs and operator to still query what they had searched for
         //products = await Product.find({$nor: [{seller:remove}]})
         
         products = await Product
         .find({$and: [ {$nor: [{seller:remove}, {category:remove}]}, {name: {$regex: query, $options:'i'} }]})
    }
    else {
        products = await Product.find({name: {$regex: query, $options:'i'}})
    }
    if (products) {
        res.status(200).json(products)
    }
    else {
        res.status(400)
        throw new Error("No products with this name or category.")
    }
})

module.exports = {
    createProduct,
    getByID,
    getCategory,
    getSale,
    getRecommended,
    getTopBrands,
    getMostSelling,
    updateProduct,
    getProducts,
    addToCart,
    addToSaved,
    getSavedById,
    getSaved,
    removeToSaved,
    getCart,
    searchFor
}
