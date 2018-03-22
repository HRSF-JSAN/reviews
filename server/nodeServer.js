require('newrelic');

const fs = require('fs');
const http = require('http');
const path = require('path');

const db = require('../database/review.js');
const { redisClient } = require('../redisIndex');

http.createServer((request, response) => {

  if (request.url === '/') {
    fs.readFile('./client/index.html', 'UTF-8', (err, html) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(html);
    });
  } else if (request.url.match('\.css$')) {
    const cssPath = path.join(__dirname, '../client', request.url);
    const fileStream = fs.createReadStream(cssPath, 'UTF-8');
    response.writeHead(200, { 'Content-Type': 'text/css' });
    fileStream.pipe(response);
  } else if (request.url === '/bundle.js') {
    const bundlePath = path.join(__dirname, '../client', request.url);
    const fileStream = fs.createReadStream(bundlePath, 'UTF-8');
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    fileStream.pipe(response);
  } else if (request.url.split('/')[1] === 'restaurants' && request.url.split('/')[3] === 'reviews') {
    const reqId = request.url.split('/')[2];
    redisClient.get(reqId, (err, reply) => {
      if (err) {
        throw err;
      }

      if (reply === null) {
        db.findReviewsByRestaurant(parseInt(reqId), (err1, data) => {
          if (err1) {
            response.statusCode = 500;
            response.end();
          } else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            redisClient.setex(`${reqId}`, 10, JSON.stringify(data));
            response.end(JSON.stringify(data));
          }
        });
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        // console.log("reply", reply);
        response.end(reply);
      }
    });
  } else {
    // console.log(`Couldn't find ${request.url.split("/")}`);
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
