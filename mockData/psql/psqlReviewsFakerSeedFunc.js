const faker = require('faker');
const fs = require('fs')

const fakeRestaurant = (i) => {
  let review = [];
  //review_id
  review.push(i+1);
  //user_id
  review.push(faker.random.number(10000000));
  //restaurant_id
  review.push(faker.random.number(10000000));
  //rating
  review.push(faker.random.number(10));
  let randomDate = faker.date.between('2017-12-15', '2018-03-15');
  //date
  review.push(randomDate);
  //reviewBody
  review.push(faker.lorem.sentences() + (i + 1));
  //useful
  review.push(faker.random.number(7));
  //funny
  review.push(faker.random.number(7));
  //cool
  review.push(faker.random.number(7));
  return review.join();
};

const wstream = fs.createWriteStream('./mockData/psql/psql_reviews_data.csv');

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

writeXTimes(10, wstream, 'utf8', () => console.log('completed creating restuarants data!'));
