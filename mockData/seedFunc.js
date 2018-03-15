Promise = require("bluebird");
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

let dbURI = 'mongodb://localhost/Restaurant';

const reviewSchema = mongoose.Schema({
  restaurantName: String,
  reviews: []
});

const Restaurant = mongoose.model('Restaurant', reviewSchema);

const fakeRestaurant = (i) => {

    let restaurant = {};
    restaurant._id = i;
    restaurant.restaurantName = faker.name.firstName();
    restaurant.reviews = [];
    for (let i = 0; i < 5; i++) {
      let review = {};
      review.userName = faker.internet.userName();
      review.userPhoto = faker.image.animals();
      review.userLocation = faker.address.city();
      review.userFriends = faker.random.number(10);
      review.userReviews = faker.random.number(100);
      review.rating = faker.random.number(5);

      let randomDate = faker.date.between('2015-01-01', '2015-01-05');

      review.date = randomDate;
      review.reviewBody = faker.lorem.sentences();
      review.useful = faker.random.number(7);
      review.funny = faker.random.number(7);
      review.cool = faker.random.number(7);

      restaurant.reviews.push(review);
    }
    return JSON.stringify(restaurant);
};

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
let wstream = fs.createWriteStream('./mockData/restaurants.json');

function writeTenMillionTimes(writer, encoding, callback) {
  let start = new Date();
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        let data = fakeRestaurant();
        writer.write(data +'\n', encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if (i % 10000 === 0) {
          let end = new Date();
          console.log(`wrote 10,000 in ${ (end - start)/1000} seconds`);
          start = new Date();
        } 
        let data = fakeRestaurant();
        ok = writer.write(data +'\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}
writeTenMillionTimes(wstream, 'utf8', () => console.log('Wrote 10 million!'));

// ----------------------------------2 mins to write 1 million records to file ---------------------------
// let writeToFile = (num) => {
//   // let start = new Date();
//   let fileNumber = 1;
  
//   for (let i = 0; i < num; i++) {
//     let review = fakeReview();
//     fs.appendFileSync(`./${fileNumber}.txt`, JSON.stringify(review));
//   };
//   // let end = new Date();
//   // console.log(`Inserted ${num} in ${ (end - start)/1000 } seconds`);
// }

// writeToFile(1000000);
//--------------------------------------------------------------------------------------------------------------

// ----------------------------------insert 10000 
// const addtoDB = (num) => {
//   mongoose.connect(dbURI);
//   let counter = 1;
//   let increment = 10000

//   let write100 = (arr) => {
//     let start = new Date();
//     Review.insertMany(arr).then(()=>{
//       if(counter <= num) {
//         next100();
//         let end = new Date();
//         console.log(`Inserted ${increment} in ${ (end - start)/1000 } seconds`);
//         // console.log("done")
//       }
//     });
//     };

//   let next100 = () => {
//     let reviews = [];
//     for (let j = counter; j <= (counter + increment); j++) {
//       // console.log(j)
//       // console.log(reviews.length);
//       const newReview = fakeReview();
//       reviews.push(newReview);
//       if(counter <= num && reviews.length === increment) {
//         // console.log("j", j, "counter", counter)
//         counter += increment;
//         // if ()
//         write100(reviews);
//       } 
//     }
//   }

//   next100();
// };

// addtoDB(100000);

//-------------------------------1000 in 0.07 seconds/ 500K in 40 secs------------------------------------------
// const addtoDB = (num) => {
//   let start = new Date()
//   mongoose.connect(dbURI);
//   let counter = 0;
//   let arr = [];

//   for (var i = 0; i < num; i++) {
//     const newReview = JSON.parse(fakeReview(i));
//     arr.push(newReview);
//   }

//   Restaurant.collection.insert(arr, () => {
//     console.log("done!")
//     let end = new Date();
//     console.log(`Inserted ${num} in ${ (end - start)/1000 } seconds`);
//     mongoose.connection.close();
//   });
// };

// addtoDB(1);
//----------------------------------------------------------------------------------------------------------------

//1000 in 1.333 seconds--------------------------------------------------------------------------------------------
// const addtoDB = (num) => {
//   let start = new Date()
//   mongoose.connect(dbURI);
//   // let db = mongoose.connection;
//   // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   let counter = 0;
//   for (var i = 0; i < num; i++) {
//     const newReview = fakeReview();
//     const review = new Review(newReview);
//     review.save().then(()=> {
//       counter++;
//       if (counter === num) {
//         let end = new Date();
//         console.log(`Inserted ${num} in ${ (end - start)/1000 } seconds`);
//         mongoose.connection.close();
//       }
//     });
//   }
// };


// addtoDB(1000);
// addtoDB(2000);
// addtoDB(2000);
// addtoDB(2000);
//-----------------------------------------------------------------------------------------------------------------
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

