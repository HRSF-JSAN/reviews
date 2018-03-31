const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env[process.env.NODE_ENV]);
const dbURI = process.env.MONGO_URL || 'mongodb://ec2-54-183-205-242.us-west-1.compute.amazonaws.com/Restaurant';
console.log(dbURI);
mongoose.connect(dbURI, (err) => {
  if (err) {
    console.log(dbURI);
    console.log('Could not connect to Mongo Server');
  }
});

const restaurantSchema = mongoose.Schema({
  id: Number,
  restaurantName: String,
  reviewsCount: Number,
  reviews: [],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const insertReview = (restaurantID, reviewObject, callback) => {
  Restaurant.update(
    { id: restaurantID },
    { $push: { reviews: reviewObject } },
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    },
  );
};

const findReview = (reviewId, callback) => {
  Restaurant.findById(reviewId).exec(callback);
};

const updateReview = (reviewId, property, value, callback) => {
  Restaurant.findById(reviewId, (err, review) => {
    if (err) {
      callback(err, null);
    }
    review[property] = value; // eslint-disable-line
    review.save(callback);
  });
};

const findReviewsByRestaurant = (restaurantId, callback) => {
  Restaurant.findOne({ id: restaurantId }).exec(callback);
};

const findHighestRestaurantId = (callback) => {
  Restaurant.findOne().exec(callback);
};

module.exports.insertReview = insertReview;
module.exports.findReview = findReview;
module.exports.updateReview = updateReview;
module.exports.findReviewsByRestaurant = findReviewsByRestaurant;
module.exports.findHighestRestaurantId = findHighestRestaurantId;
