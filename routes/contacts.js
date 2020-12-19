                                                    // NPM Packages
// import Express package
const express = require('express');
// create new router for users routes
const router = express.Router()
// import authorization middleware function to protect routes
const auth = require('../middleware/auth')
//import Express validator package functions to check for desired information in data transmitted via users routes
const { check, validationResult } = require('express-validator');

                                                    // Mongoose Schema Models
// import model for the user schema
const User = require('../models/User');
// import model for the contact schema
const Contact = require('../models/Contact');

                                                    // API Routes
// @route   GET api/contacts
// @desc    Get all contacts from a users list
// @access  Private
router.get('/',
  // Protect route with auth function
  auth,
  // Respond to data request
  async (req, res)=>{
    try {
      // Create variable set to returned contact value found by user id
      let contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
      // Respond with array of contacts correlated to that user id
      res.json(contacts);

    // Respond to any Errors
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }

  });

// @route   POST api/contacts
// @desc    Add new contact information to list
// @access  Private
router.post('/', (req, res)=>{
  res.send("Add new contact information to a user's list")
});

// @route   PUT api/contacts
// @desc    Update contact information on list
// @access  Private
router.put('/:id', (req, res)=>{
  res.send("Update contact information on a user's list")
});

// @route   DELETE api/contacts
// @desc    Delete a contact from list
// @access  Private
router.delete('/:id', (req, res)=>{
  res.send("Delete contact information from a user's list")
});

module.exports = router;