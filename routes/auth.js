// import Express package
const express = require('express');
// create new router for users routes
const router = express.Router()
// import model for the user schema
const User = require('../models/User');
// import bcrypt package
const bcrypt = require('bcryptjs');
// import json-web-token package to authorize users
const jwt = require('jsonwebtoken');
// import config package to use variables from default.json file
const config = require('config');
// import authorization middleware function to protect routes
const auth = require('../middleware/auth')
//import Express validator package functions to check for desired information in data transmitted via users routes
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Get a logged in user
// @access  Private
router.get('/', auth, (req, res)=>{
  res.send('Get logged in user')
});


// @route   POST api/auth
// @desc    Authorize user and GET token
// @access  Public
router.post('/',
  // Include express-validator middleware to ensure required information
  [
    // check request for email value
    check('email', 'Please include a valid email address').isEmail(),
    // check request for password value
    check('password', 'Must enter a password').exists()
  ],
  // Respond to POST route query
  async (req, res)=>{
    // set variable to result of express-val validatResult() function
    const errors = validationResult(req);
    // If there are errors with validation
    if(!errors.isEmpty()){
      // return error status code and json object with error message
      return res.status(400).json({ errors: errors.array() })
    }

    // If there are NO errors with validation

    // Deconstruct user data from request object body
    const { email, password } = req.body

    // Find user credentials in DB
    try {
      // Create variable set to return result of querying db for a user by email
      let user = await User.findOne({ email })
      // If NO user found with the email
      if(!user){
        // return error status code and json object with error message
        return res.status(400).json({ msg: 'Invalid User Email'});
      }
      // Create variable set to return value of querying db for user by password
      const isMatch = await bcrypt.compare(password, user.password)
      // If NO user found with matching password
      if(!isMatch){
        // return error status code and json object with error message
        return res.status(400).json({ msg: 'Invalid User Password'});
      }

      // If matching user is found in database, authorize & return json web token

       // Create payload to send with json web token, only user_id
       const payload = {
          user: {
            id: user.id
          }
        };
       // Sign the web token to finish creation process
       jwt.sign(payload, config.get('jwtSecret'), {
          // set length of time before token is destroyed ending session
          expiresIn: 360000
        }, ( error, token ) => {
          // If error signing token throw error
          if(error) { throw error; }
          // Else return new token for user authorization
          else { res.json({ token })}
        });

    // Return error message if user not found in DB
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
});

module.exports = router;