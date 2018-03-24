require('newrelic');
const http = require('http');

const router = require('./nodeServerHelpers');

http.createServer((request, response) => {
  console.log(request.url);
  if (request.url === '/') {
    router.serveHTML(response);
  } else if (request.url.match('.css$')) {
    router.serveCSS(response);
  } else if (request.url === '/bundle.js') {
    router.serveClientBundle(response);
  } else if (request.url === '/server-bundle.js') {
    router.serverServerBundle(response);
  } else if (request.url.split('/')[1] === 'restaurants' && request.url.split('/')[3] === 'reviews') {
    router.serveRestaurant(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
