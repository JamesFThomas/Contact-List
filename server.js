// common JS syntax to import modules into file
const express = require('express');
// create new instance of express in this project
const app = express();
// import connectDB function
const connectDB = require('./config/db')

// invoke conncetDB() to create connection to mongoDB
connectDB();

// Initialize middleware to parse body data in json format
app.use(express.json({ extended:false }));


                                                                                   // Routes

// Home
app.get('/', (req, res)=>{
  res.json({ msg:'Welcome to the ContactList API...' })}
);
// Routers
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


// create variable set to PORT value for dev & production
const PORT = process.env.PORT || 5000;

// create listen function to direct server to monitor particular port + connection message
app.listen( PORT, () => console.log(`Server listening on port ${PORT}...`));

