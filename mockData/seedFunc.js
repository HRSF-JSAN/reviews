Promise = require("bluebird");
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

let dbURI = 'mongodb://localhost/Restaurant';

const reviewSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  restaurantName: String,
  reviewsCount: Number,
  reviews: [],
});

const Restaurant = mongoose.model('Restaurant', reviewSchema);

const fakeRestaurant = (i) => {

  const restaurant = {};
  restaurant.id = i;
  restaurant.restaurantName = faker.name.firstName()+i+ "'s Restaurant" ;
  restaurant.reviewsCount = Math.floor(Math.random() * 6);
  restaurant.reviews = [];
  for (let j = 0; j < restaurant.reviewsCount; j += 1) {
    const review = {};
    review.userName = faker.internet.userName();
    review.userPhoto = faker.image.avatar();
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
      writer.once('drain', write);
    }
  }
  write();
}

writeXTimes(10000000, wstream, 'utf8', () => console.log('Wrote 10 million!'));
