// import mongoose package into file
const mongoose = require('mongoose');
// import config package to access global variable
const config = require('config');
// create variable set to DB URI in config file
  // .get() is a config method
const db = config.get('mongoURI');

// Function => create connection to cloud DB instance
const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  } )
  .then(() => {
    console.log('Release The Mongeese...');
  })
  .catch((err) => {
    console.error(err.message);
    // exit the process with failure
    process.exit(1);
  })
}

module.exports = connectDB;