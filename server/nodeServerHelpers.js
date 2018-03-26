const fs = require('fs');
const path = require('path');

const db = require('../database/review.js');
const { redisClient } = require('../redisIndex');


module.exports.serveHTML = (request, response) => {
  fs.readFile('./client/index.html', 'UTF-8', (err, html) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  });
};

module.exports.serveCSS = (request, response) => {
  const cssPath = path.join(__dirname, '../client', request.url);
  const fileStream = fs.createReadStream(cssPath, 'UTF-8');
  response.writeHead(200, { 'Content-Type': 'text/css' });
  fileStream.pipe(response);
};

module.exports.serveClientBundle = (request, response) => {
  const bundlePath = path.join(__dirname, '../client', request.url);
  const fileStream = fs.createReadStream(bundlePath, 'UTF-8');
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  fileStream.pipe(response);
};

module.exports.serveServerBundle = (request, response) => {
  const serverBundlePath = path.join(__dirname, '../client', request.url);
  const fileStream = fs.createReadStream(serverBundlePath, 'UTF-8');
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  fileStream.pipe(response);
};

module.exports.serveRestaurant = (request, response) => {
  const reqId = request.url.split('/')[2];
  redisClient.get(reqId, (err, reply) => {
    if (err) {
      throw err;
    } else if (reply !== null) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(reply);
    } else {
      db.findReviewsByRestaurant(Number(reqId), (err1, data) => {
        if (err1) {
          response.statusCode = 500;
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          redisClient.setex(reqId, 60, JSON.stringify(data));
          response.end(JSON.stringify(data));
        }
      });
    }
  });
};
