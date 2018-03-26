const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Something went wrong ', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

module.exports.redisClient = redisClient;
