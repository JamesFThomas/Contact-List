// import Express package
const express = require('express');

// create new router for users routes
const router = express.Router()

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res)=>{
  res.send('Register a new user')
});

module.exports = router;