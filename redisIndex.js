const redis = require('redis');

let REDIS_PORT;

if (process.env.REDIS_HOST) {
  REDIS_PORT = process.env.REDIS_HOST;
} else {
  REDIS_PORT = 6379;
}

console.log(REDIS_PORT);

const redisClient = redis.createClient({host: 'redis'});

redisClient.on('error', (err) => {
  console.log('Something went wrong ', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

module.exports.redisClient = redisClient;
