const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
        unique: [true, "Email address is already taken"],
    },
    cart: [String],
    orders: [String],
    past_orders: [String],
    saved: [String],
    notifications: [String],
    total: Number,
    total_saved: Number,
},
{
    timestamps:true,
}
)

module.exports = mongoose.model("User", userSchema);