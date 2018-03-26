require('newrelic');

const http = require('http');

const router = require('./nodeServerHelpers');

http.createServer((request, response) => {
  // console.log(request.url);
  if (request.url === '/') {
    router.serveHTML(request, response);
  } else if (request.url.match('.css$')) {
    router.serveCSS(request, response);
  } else if (request.url === '/bundle.js') {
    router.serveClientBundle(request, response);
  } else if (request.url === '/server-bundle.js') {
    router.serveServerBundle(request, response);
  } else if (request.url.split('/')[1] === 'restaurants' && request.url.split('/')[3] === 'reviews') {
    router.serveRestaurant(request, response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
