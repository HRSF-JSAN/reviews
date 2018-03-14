Promise = require("bluebird");

const faker = require('faker');
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

// Promise.promisifyAll(require("mongodb"));
let dbURI = 'mongodb://localhost/ReviewTest';

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

const fakeReview = () => {
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

    return reviewObj;
};

const addtoDB = (num) => {
  let start = new Date()
  mongoose.connect(dbURI);
  // let db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  let counter = 0;
  for (var i = 0; i < num; i++) {
    const newReview = fakeReview();
    const review = new Review(newReview);
    review.save().then(()=> {
      counter++;
      if (counter === num) {
        let end = new Date();
        console.log(`Inserted ${num} in ${ (end - start)/1000 } seconds`);
        mongoose.connection.close();
      }
    });
  }
};


addtoDB(2000);
// addtoDB(2000);
// addtoDB(2000);
// addtoDB(2000);

//................................................................works but ...
// const addtoDB = new Promise((resolve, reject) => {

//   mongoose.connect('mongodb://localhost/ReviewTest');

//   let counter = 1;
//   let db = mongoose.connection;

//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//   for (var i = 1; i <= 10; i++) {
//     if (counter === 10) {
//       console.log("counter hit 10")
//       mongoose.disconnect();
//       resolve();
//     } else {
//       const newReview = fakeReview();
//       const review = new Review(newReview);
//       review.save()
//     }
//   }

// })

// addtoDB.then(()=>{
//   let end = new Date();
//   console.log(`Inserted 10000 in ${ end - start } milliseconds`);
// });
//..............................................................................

