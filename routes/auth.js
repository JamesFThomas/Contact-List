// import Express package
const express = require('express');

// create new router for users routes
const router = express.Router()

// @route   GET api/auth
// @desc    Get a logged in user
// @access  Private
router.get('/', (req, res)=>{
  res.send('Get logged in user')
});

// @route   POST api/auth
// @desc    Authorize user and GET token
// @access  Public
router.post('/', (req, res)=>{
  res.send('Log in user')
});

module.exports = router;