const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env[process.env.NODE_ENV]);

const reviewSchema = mongoose.Schema({
  restaurant: Number,
  restaurantName: String,
  userName: String,
  userPhoto: String,
  userLocation: String,
  userFriends: Number,
  userReviews: Number,
  rating: Number,
  date: Date,
  reviewBody: String,
  useful: Number,
  funny: Number,
  cool: Number,
});

const Review = mongoose.model('Review', reviewSchema);

const insertReview = (reviewObject, callback) => {
  Review.create(reviewObject, (err, review) => {
    callback(err, review);
  });
};

const findReview = (reviewId, callback) => {
  Review.findById(reviewId).exec(callback);
};

const updateReview = (reviewId, property, value, callback) => {
  Review.findById(reviewId, (err, review) => {
    if (err) {
      callback(err, null);
    }
    review[property] = value; // eslint-disable-line
    review.save(callback);
  });
};

const findReviewsByRestaurant = (restaurantId, callback) => {
  Review.find({ restaurant: restaurantId }).sort('-date').exec(callback);
};

const findHighestRestaurantId = (callback) => {
  Review.findOne().sort('-restaurant').exec(callback);
};


module.exports.insertReview = insertReview;
module.exports.findReview = findReview;
module.exports.updateReview = updateReview;
module.exports.findReviewsByRestaurant = findReviewsByRestaurant;
module.exports.findHighestRestaurantId = findHighestRestaurantId;
