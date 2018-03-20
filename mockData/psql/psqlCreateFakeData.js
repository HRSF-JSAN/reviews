const faker = require('faker');
const fs = require('fs');
const { fakeRestaurant, fakeReview, fakeUsers, writeXTimes } = require('./psqlFakerHelpers');

const restaurantStream = fs.createWriteStream('./mockData/psql/csv_files/psql_rest_data.csv');
const userStream = fs.createWriteStream('./mockData/psql/csv_files/psql_user_data.csv');
const reviewStream = fs.createWriteStream('./mockData/psql/csv_files/psql_reviews_data.csv');

writeXTimes(fakeRestaurant, 10000000, restaurantStream, 'utf8', () => console.log('completed creating restuarants data!'));
writeXTimes(fakeUsers, 10000000, userStream, 'utf8', () => console.log('completed creating users data!'));
writeXTimes(fakeReview, 15000000, reviewStream, 'utf8', () => console.log('completed creating reviews data!'));
