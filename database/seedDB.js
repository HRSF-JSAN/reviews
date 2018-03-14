const mongoose = require('mongoose');
const allRestaurants = require('../mockData/basicRestaurantData.js');
const seedDataBase = require('../mockData/seedFunc.js');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO);
mongoose.connect('mongodb://localhost/Review');

seedDataBase(allRestaurants, err => (
  err ? console.log('seed unsuccessful') : console.log('Success!')
));
