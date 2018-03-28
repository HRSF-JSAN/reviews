const mongoose = require('mongoose');
const seedDataBase = require('./seedFunc.js');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO);
let connection = process.env.MONGO_URL || 'mongodb://localhost/Review';
mongoose.connect(connection);

seedDataBase(allRestaurants, err => (
  err ? console.log('seed unsuccessful') : console.log('Success!')
));
