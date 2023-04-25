const express = require("express");
const { registerUser, loginUser, updateUser, currentUser, deleteUser, getProfile, purchaseCart} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/update", updateUser)
router.post('/getProfile',  getProfile)
router.post('/purchaseCart', purchaseCart)
router.delete('/delete',deleteUser)
router.get("/current", validateToken, currentUser)

module.exports = router
