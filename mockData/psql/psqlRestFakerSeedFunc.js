const faker = require('faker');
const fs = require('fs')

const fakeRestaurant = (i) => {
  let restaurant = [];
  restaurant.push(i+1);
  restaurant.push(faker.name.firstName()+(i+1)+ "'s Restaurant") ;
  return restaurant.join();
};

const wstream = fs.createWriteStream('./mockData/psql/psql_rest_data.csv');

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
