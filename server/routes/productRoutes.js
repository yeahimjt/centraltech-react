const express = require("express");
const Product = require("../models/productModel")
const {createProduct, getByID,getCategory, getSale, getRecommended, getTopBrands,getMostSelling, addToCart, addToSaved, getSavedById, removeToSaved, getSaved, getProfile, getCart} = require("../controllers/productController")
const validateToken = require("../middleware/validateTokenHandler");
const csvtojson = require("csvtojson")
const router = express.Router();

// Import csv data to mongodb

router.post('/import', async (req,res) => {
    csvtojson()
        .fromFile("centraltechdata.csv")
        .then(csvData => {
            console.log(csvData);
            Product.insertMany(csvData).then(function (){
                console.log("Data Inserted")
                res.json({success: 'success'});
            }).catch(function (err) {
                console.log(err)
            })
        })
})

router.post('/drop', async(req,res)=> {
    const dropped = await Product.collection.drop()
    if (dropped) {
        res.status(200).json({"Message": "Successfully dropped the collection"})
    }
})

router.post("/create", createProduct)
router.post("/getCategory", getCategory).post('/getByID', getByID).post('/addToCart', addToCart).post('/addToSaved',addToSaved).post('/getSavedById', getSavedById).post('/removeToSaved', removeToSaved).post('/getSaved', getSaved).post('/getCart', getCart)
router.get("/getSale", getSale).get("/getRecommended", getRecommended).get("/getTopBrands", getTopBrands).get("/getMostSelling", getMostSelling)
module.exports = router
