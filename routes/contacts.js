// import Express package
const express = require('express');

// create new router for users routes
const router = express.Router()

// @route   GET api/contacts
// @desc    Get all contacts from a users list
// @access  Private
router.get('/', (req, res)=>{
  res.send("Get all contact information on a user's list")
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