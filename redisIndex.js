const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Something went wrong ', err);
});

redisClient.on('connect', function() {
    console.log('connected to redis');
});

module.exports.redisClient = redisClient;
// client.set('my test key', 'my test value', redis.print);

// client.get('my test key', (error, result) => {
//   if (error) throw error;
//   console.log('GET result ->', result);
// });
