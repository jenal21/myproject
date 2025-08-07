const express = require("express");
const router = express.Router();
const {resetPassword, forgotPassword, registerUser, loginUser} = require("../controllers/user_controller")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
