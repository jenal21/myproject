const User = require("../models/user_models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  console.log("Register Request Body:", req.body)
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({message:"All fileds are required"});
      
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log('Register error:', error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email recevied:", email)

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  
};
