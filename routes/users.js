// import Express package
const express = require('express');
// create new router for users routes
const router = express.Router()
// import model for the user schema
const User = require('../models/User')
//import Express validator package functions to check for desired information in data transmitted via users routes
const { check, validationResult } = require('express-validator');

                                                                            // Routes

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
  check('name', 'name is required')
    .not()
    .isEmpty(),
  check('email','Please include a valid email address')
    .isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({
      min: 6
    })
], (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res
      .status(400)
      .json({
        errors: errors.array()
      });
  }

  res.send('passed')

});

module.exports = router;