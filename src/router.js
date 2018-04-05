const { staticHandler, placeHandler } = require('./handler');

const router = (request, response) => {
  const url = request.url;

  if (url === '/') {
    console.log(url);
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else if (url.indexOf('places') !== -1) {
    placeHandler(response, url);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
