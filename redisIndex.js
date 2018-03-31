const redis = require('redis');

// let REDIS_PORT;

// // if (process.env.REDIS_HOST) {
// //   REDIS_PORT = process.env.REDIS_HOST;
// // } else {
// //   REDIS_PORT = 6379;
// // }

// console.log(REDIS_PORT);

const redisClient = redis.createClient('redis://ec2-54-183-227-242.us-west-1.compute.amazonaws.com:6379');

redisClient.on('error', (err) => {
  console.log('Something went wrong ', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

module.exports.redisClient = redisClient;
