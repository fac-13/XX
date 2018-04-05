const { staticHandler, placeHandler } = require('./handler');

const router = (request, response) => {
  console.log(request.url);
  const url = request.url;
  console.log(url);
  if (url === '/') {
    console.log(url);
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public')!== -1) {
    staticHandler(response, url);
  } else if (url==='/list-places'){
    placeHandler(response, url);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
