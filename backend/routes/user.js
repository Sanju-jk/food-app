
//routes for register and login
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt") //gensalt(), hash()
const jwt = require("jsonwebtoken")
const User = require('../models/User'); // Importing user schema 

const JWTSECRET = "asd12f6y8&^FUYGUytgu%^";
// createuser endpoint for posting data
router.post(
  "/createuser",
  // Validation rules
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('location').notEmpty().withMessage('Location is required'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body

    //hashing password using bcrypt
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password, salt);

    try {
      // Create the user if validation passes
      await User.create({
        name: name,
        email: email,
        password: securePassword,
        location: location
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
);



//endpoint for user login
router.post(
  "/loginuser",
  [body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {  email, password } = req.body
      let userData = await User.findOne({ email }); //gets the user data from mongodb
      if (!userData) return res.status(400).json({ errors: "Invalid Email ID!" });

      const passwordCompare =  bcrypt.compare(password, userData.password);
      if (!passwordCompare) return res.status(400).json({ errors: "Invalid Password!" });

      //jwt
      const data = {
        user: {
          id: userData._id
        }
      }
      const authToken = jwt.sign(data, JWTSECRET) //generating auth token
      return res.json({ success: true,  authToken : authToken })
      
    } catch (error) {
      console.error("Server error:", error); // Log error details

      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
