const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env[process.env.NODE_ENV]);
let dbURI = 'mongodb://localhost/Restaurant';

mongoose.connect(dbURI);

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

  // Restaurant.findOne({ id: restaurantID })
  // .then((data)=>console.log(data));
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
  Restaurant.find({ id: restaurantId }).exec(callback);
};

const findHighestRestaurantId = (callback) => {
  Restaurant.findOne().sort('-restaurant').exec(callback);
};


module.exports.insertReview = insertReview;
module.exports.findReview = findReview;
module.exports.updateReview = updateReview;
module.exports.findReviewsByRestaurant = findReviewsByRestaurant;
module.exports.findHighestRestaurantId = findHighestRestaurantId;
