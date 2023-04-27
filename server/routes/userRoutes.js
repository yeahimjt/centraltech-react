const express = require("express");
const { registerUser, loginUser, updateUser, currentUser, deleteUser, getProfile, purchaseCart,removeCartItem,getUsers} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/update", updateUser)
router.post('/getProfile',  getProfile)
router.post('/purchaseCart', purchaseCart)
router.post('/removeCartItem',removeCartItem)
router.delete('/delete',deleteUser)
router.get("/current", validateToken, currentUser)
router.get("/getUsers", getUsers)

module.exports = router
