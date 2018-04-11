const { staticHandler, placeHandler, addPlaceHandler } = require('./handler');

const router = (request, response) => {
  const [url] = request.url;
  if (url === '/') {
    console.log(url);
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else if (url === '/list-places') {
    placeHandler(response, url);
  } else if (url.indexOf('add-place') !== -1) {
    addPlaceHandler(request, response);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
