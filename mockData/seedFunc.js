const writeReviews = require('./writeAllReviews.js');
const db = require('../database/review.js');
const faker = require('faker');
const mongoose = require('mongoose');

// const seedDataBase = (restaurantList, callback) => {
//   const reviews = fakeReviews(n);
//   reviews.forEach((review, index) => {
//     db.insertReview(review, (err) => {
//       if (err) {
//         callback(err);
//       } else if (index === reviews.length - 1) {
//         callback(null);
//       }
//     });
//   });
// };
mongoose.connect('mongodb://localhost/ReviewTest');
var time1 = new Date();
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

const Review = mongoose.model('ReviewTest', reviewSchema);

let runner = 0;

const fakeReviews = (n) => {
  // let restaurant: faker.random.word,

  for (let i = 0; i < n; i++) {
    let reviewObj = {};
    reviewObj.restaurantName = faker.random.word();
    reviewObj.userName = faker.internet.userName();
    reviewObj.userPhoto = faker.lorem.sentence();
    reviewObj.userLocation = faker.address.city();
    reviewObj.userFriends = faker.random.number();
    reviewObj.userReviews = faker.random.number();
    reviewObj.rating = faker.random.number();

    let randomDate = faker.date.between('2015-01-01', '2015-01-05');

    reviewObj.date = randomDate;
    reviewObj.reviewBody = faker.lorem.sentence();
    reviewObj.useful = faker.random.number();
    reviewObj.funny = faker.random.number();
    reviewObj.cool = faker.random.number();
    addtoDB(reviewObj);
  }
};

const addtoDB = (review) => {
  db.insertReview(review, (err) => {
    if (err) {
      console.log(err);
    } else {
      runner++;
      if (Number.isInteger(runner / 1000)) {
        console.log(runner);
      }
    }
  });
};

fakeReviews(20000);
let time2 = new Date();
let inSeconds = (time2 - time1)/1000;
console.log(`it took ${inSeconds} seconds to insert ${runner} records`);

