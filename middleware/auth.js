// import jwt package to verify web token
const jwt = require('jsonwebtoken')
//import config to give access to secret
const config = require('config')

module.exports = (req, res, next) => {
  // GET token from header
  const token = req.header('x-auth-token')

  // If NO token in header
  if(!token){
    return res. status(401).json({ msg: 'No token, authorization denied' })
  }

  // If web token in header
  try {
    // Create variable set to return response of verifying token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Set user value on request object to verified decoded user data
    req.user = decoded.user;
    // Move to next function in middleware chain
    next();

  // Return error messages if user not authorized
  } catch (error) {
    res.status(401).json({ msg: 'Invalid Token' })
  }
}