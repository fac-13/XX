const requestModule = require('request');

const { staticHandler, placeHandler, addPlaceHandler } = require('./handler');

const router = (request, response) => {
  const url = request.url;

  if (url === '/') {
    console.log(url);
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else if (url.indexOf('places') !== -1) {
    placeHandler(response, url);
  } else if (url.indexOf('add-place') !== -1) {
    // collect all the data from the stream

    let data = '';
    requestModule.on('data', chunk => data += chunk);
    requestModule.on('end', () => {
      addPlaceHandler(data);
    });
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
