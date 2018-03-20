const faker = require('faker');

module.exports.fakeRestaurant = (i) => {
  const restaurant = [];
  restaurant.push(i + 1);
  restaurant.push(`${faker.name.firstName()}${i + 1}'s Restaurant`);
  return restaurant.join();
};

module.exports.fakeReview = (i) => {
  const review = [];
  review.push(i + 1);
  review.push(faker.random.number({ min: 1, max: 10000000 }));
  review.push(faker.random.number({ min: 1, max: 10000000 }));
  review.push(faker.random.number(10));
  const randomDate = faker.date.between('2017-12-15', '2018-03-15');
  review.push(randomDate);
  review.push(faker.lorem.sentences() + (i + 1));
  review.push(faker.random.number(7));
  review.push(faker.random.number(7));
  review.push(faker.random.number(7));
  return review.join();
};

module.exports.fakeUsers = (i) => {
  const user = [];
  user.push(i + 1);
  user.push(faker.internet.userName());
  user.push(faker.address.city());
  user.push(faker.random.number(10));
  user.push(faker.image.avatar());
  return user.join();
};

module.exports.writeXTimes = (fakerFunc, x, writer, encoding, callback) => {
  let i = x;

  function write() {
    let ok = true;
    do {
      i--;
      const data = fakerFunc(i);
      if (i === 0) {
        writer.write(`${data}\n`, encoding, callback);
      } else {
        if (i % 10000 === 0) {
          console.log(`wrote 10,000 items`);
        }
        ok = writer.write(`${data}\n`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};
