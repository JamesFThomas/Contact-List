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
router.post('/',
  // Protect route with multiple middleware functions
  [
    auth,
    [
      check('name', 'Name value is required')
        .not()
        .isEmpty()
    ]
  ],
  // Respond to data request
  async (req, res)=>{
    // Include validationResults function from express-validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res
        .status(400)
        .json({
          errors: errors.array()
        });
    }

    // Deconstruct contact information from request object
    const { email, name, phone, type } = req.body;

    try {
      // Create variable set to new contact model to be persisted in db
      const newContact = new Contact({
        email,
        name,
        phone,
        type,
        user: req.user.id
      })
      // Create variable set to return value of saving new contact information
      const contact = await newContact.save()
      // Return the new contact information to the client
      res.json(contact)

    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
});

// @route   PUT api/contacts
// @desc    Update contact information on list
// @access  Private
router.put('/:id', auth, async (req, res)=>{
  // Deconstruct contact information from request object
  const { email, name, phone, type } = req.body;

  // Build contact object to hold values to be updated
  const contactFields = {};
  // Assign transmitted data to appropriate contactFields prop
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    //create variable set to return value of finding by user id
    let contact = await Contact.findById(req.params.id)

    // If contact not found by user id return error
    if(!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Ensure that current user owners the contact attempting to update
    if(contact.user.toString() !== req.user.id){
      // Return error message if not owner of contact
      return res.status(401).json({ msg: 'Not authorized' })
    }

    // If contact found by user id update persisted contact information
    contact = await Contact.findByIdAndUpdate(req.params.id,
      // Update contact information with values in contactFields object
      { $set: contactFields },
      { new: true}
    );

    // Return Updated Contact Information
    res.json(contact)

  // Handle error messages
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

});

// @route   DELETE api/contacts
// @desc    Delete a contact from list
// @access  Private
router.delete('/:id', auth, async (req, res)=>{
  try {
    //create variable set to return value of finding by user id
    let contact = await Contact.findById(req.params.id)

    // If contact not found by user id return error
    if(!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Ensure that current user owners the contact attempting to update
    if(contact.user.toString() !== req.user.id){
      // Return error message if not owner of contact
      return res.status(401).json({ msg: 'Not authorized' })
    }

    // If contact found by user id update persisted contact information
    await Contact.findByIdAndRemove(req.params.id);

    // Return Updated Contact Information
    res.json({ msg: 'Contact successfully Removed' })

  // Handle error messages
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

});

module.exports = router;