const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add product name"],
    },
    description: {
        type: String,
        required: [true, "Please add product description"],
    },
    price: {
        type: String,
        required: [true, "Please add product price"],
    },
    sale: {
        type: String,
    },
    seller: {
        type: String,
        required: [true, "Please add the product seller"],
    },
    category: {
        type: String,
        required: [true, "Please add the product category"],
    },
    path_url: {
        type: String,
        required: [true, "Please add product path url"]
    },
    rating: String,
    reviews: String,
    orders: [String],
    on_sale: Boolean,
    sale: String,
})

module.exports = mongoose.model("Products", productSchema)