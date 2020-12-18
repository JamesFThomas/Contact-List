// import Express package
const express = require('express');
// create new router for users routes
const router = express.Router();
// import model for the user schema
const User = require('../models/User');
// import bcrypt package
const bcrypt = require('bcryptjs');
// import json-web-token package to authorize users
const jwt = require('jsonwebtoken');
// import config package to use variables from default.json file
const config = require('config');
//import Express validator package functions to check for desired information in data transmitted via users routes
const { check, validationResult } = require('express-validator');

                                                                            // Routes

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
  // include express-validator middleware functions to ensure presence of required data
[
  check('name', 'name is required')
    .not()
    .isEmpty(),
  check('email','Please include a valid email address')
    .isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({
      min: 6
    })
],
async (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res
      .status(400)
      .json({
        errors: errors.array()
      });
  }

    // deconstruct needed data from req.body
    const {name, email, password} = req.body;

    try {
      // Use mongoose.findOne() to query DB for user email
      let user = await User.findOne({ email });
      // If email found
      if(user){
        // return error message "user already exists"
        return res.status(400).json({ msg: "User already in database" });
      }
      // If email not found
      else{
        // Create new entry in db for user with User model
        user = new User({
          name,
          email,
          password
        });
      }

      // Create salt to encrypt user information before persisting in db
      const salt = await bcrypt.genSalt(10);

      // Use salt to hash user password prop of above new User object
      user.password = await bcrypt.hash(password, salt)

      // Save new User model in DB
      await user.save();

      // Confirm new User model saved in db
      // res.send('New User Saved');

      // Create payload to send with json web token, only user_id
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign the web token to finish creation process
      jwt.sign(payload, config.get('jwtSecret'), {
        // set experiesIn prop to destroy token in set duration
        expiresIn: 360000
      }, ( error, token ) => {
        // If error signing token throw error
        if(error) { throw error; }
        // Else return new token for user authorization
        else { res.json({ token })}
      })

    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }

});

module.exports = router;