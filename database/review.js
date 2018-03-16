const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env[process.env.NODE_ENV]);
let dbURI = 'mongodb://localhost/Restaurant';
mongoose.connect(dbURI);

// const reviewSchema = mongoose.Schema({
//   restaurant: Number,
//   restaurantName: String,
//   userName: String,
//   userPhoto: String,
//   userLocation: String,
//   userFriends: Number,
//   userReviews: Number,
//   rating: Number,
//   date: Date,
//   reviewBody: String,
//   useful: Number,
//   funny: Number,
//   cool: Number,
// });

const restaurantSchema = mongoose.Schema({
  restaurantName: String,
  reviews: [],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const insertReview = (reviewObject, callback) => {
  Restaurant.create(reviewObject, (err, review) => {
    callback(err, review);
  });
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
  Restaurant.find({ restaurant: restaurantId }).sort('-date').exec(callback);
};

const findHighestRestaurantId = (callback) => {
  Restaurant.findOne().sort('-restaurant').exec(callback);
};


module.exports.insertReview = insertReview;
module.exports.findReview = findReview;
module.exports.updateReview = updateReview;
module.exports.findReviewsByRestaurant = findReviewsByRestaurant;
module.exports.findHighestRestaurantId = findHighestRestaurantId;
