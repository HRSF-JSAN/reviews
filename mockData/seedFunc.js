Promise = require("bluebird");
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

let dbURI = 'mongodb://localhost/Restaurant';

const reviewSchema = mongoose.Schema({
  id: Number,
  restaurantName: String,
  reviews: [],
});

const Restaurant = mongoose.model('Restaurant', reviewSchema);

const fakeRestaurant = (i) => {

  const restaurant = {};
  restaurant.id = i;
  restaurant.restaurantName = faker.name.firstName() + i;
  restaurant.reviews = [];
  const randomNumberOfReviews = Math.floor(Math.random() * 6);
  for (let j = 0; j < randomNumberOfReviews; j += 1) {
    const review = {};
    review.userName = faker.internet.userName();
    review.userPhoto = faker.image.animals();
    review.userLocation = faker.address.city();
    review.userFriends = faker.random.number(10);
    review.userReviews = faker.random.number(100);
    review.rating = faker.random.number(5);

    let randomDate = faker.date.between('2017-12-15', '2018-03-15');

    review.date = randomDate;
    review.reviewBody = faker.lorem.sentences() + i;
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

function writeXTimes(x, writer, encoding, callback) {
  let start = new Date();
  let i = x;

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        const data = fakeRestaurant(i);
        writer.write(data + '\n', encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if (i % 10000 === 0) {
          let end = new Date();
          console.log(`wrote 10,000 in ${ (end - start)/1000} seconds`);
          start = new Date();
        }
        data = fakeRestaurant(i);
        ok = writer.write(data +'\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }

  write();
}

writeXTimes(10000000, wstream, 'utf8', () => console.log('Wrote 10 million!'));
