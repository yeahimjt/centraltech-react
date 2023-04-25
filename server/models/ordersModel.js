const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    fulfilled: {
        type: Boolean,
        required: [true, "Please add if order has been fulfilled"],
    },
    items_id: {
        type: [String],
        required: [true, "Please add the items"],
    },
    items_name: {
        type: [String],
        required: [true, "Please add the items"],
    },
    items_category: {
        type: [String],
        required: [true, "Please add the items"],
    },
    userId: {
        type: String,
        required: [true, "Please add the user Id"]
    },
    total: {
        type: String
    },
    saved: {
        type: String
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model("Order", orderSchema);