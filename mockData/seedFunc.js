Promise = require("bluebird");
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

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

    return JSON.stringify(reviewObj);
};

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
// function writeOneMillionTimes(writer, data, encoding, callback) {
let wstream = fs.createWriteStream('myOutput.txt');
function writeOneMillionTimes(writer, encoding, callback) {
  let i = 1000000;
  write();
  // for (let j = 0; i < records; i++) {
  //   let review = fakeReview();
  //   fs.appendFileSync(`./${fileNumber}.txt`, JSON.stringify(review));
  // };
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(fakeReview() +'/n', encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(fakeReview() +'/n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(wstream, 'utf8', () => console.log('done!'));

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
//     const newReview = fakeReview();
//     arr.push(newReview);
//   }

//   Review.collection.insert(arr, () => {
//     console.log("done!")
//     let end = new Date();
//     console.log(`Inserted ${num} in ${ (end - start)/1000 } seconds`);
//     mongoose.connection.close();
//   });
// };

// addtoDB(500000);
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

