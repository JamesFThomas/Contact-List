// import mongoose package
const mongoose = require('mongoose')
// create variable set to new user Schema properties
const ContactSchema = mongoose.Schema({
  // Include User as foreign key to connect contact to specific user in db
  user: {
    // Connect user object by mongoose unique id
    type: mongoose.Schema.Types.ObjectId,
    // Reference to users model
    ref: 'users'
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
  },
  type: {
    type: String,
    default: 'personal'
  },
  date:{
    type: Date,
    default: Date.now
  }
})

// export model for the contact schema in order to use definition for data entry
module.exports = mongoose.model('contact', ContactSchema);