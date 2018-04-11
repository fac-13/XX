const fs = require('fs');
const path = require('path');
// const request = require('request');
const queryString = require('querystring');
const { getPlaces } = require('./queries/getData');
const { addPlace, addReview } = require('./queries/postData');

const staticHandler = (response, filepath) => {
  const extension = filepath.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
  };

  fs.readFile(path.join(__dirname, '..', filepath), 'utf8', (error, file) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end();
    } else {
      response.writeHead(200, { 'content-type': extensionType[extension] });
      response.end(file);
    }
  });
};

const placeHandler = (response) => {
  getPlaces((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(err);
    } else {
      const output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.end(output);
    }
  });
};

function addPlaceHandler(request, response) {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    data = queryString.parse(data);

    const [name, comment, description, positive] = [
      data.name,
      data.comment,
      data.description,
      !!data.positive,
    ];
    console.log(
      'NAME, COMMENT, DES, +ITY',
      name,
      comment,
      description,
      positive,
    );
    addPlace(name, description, (err) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        // response.writeHead(307, { Location: '/add-place' });
        response.end('sorry');
      } else {
        response.writeHead(200, { 'content-type': 'text/plain' });
        // response.writeHead(307, { Location: '/add-place' });
        response.end(`Successfully added ${name} as ${description}`);
      }
    });
    addReview(comment, positive, (err) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        // response.writeHead(307, { Location: '/add-place' });
        response.end('sorry');
      } else {
        response.writeHead(200, { 'content-type': 'text/plain' });
        // response.writeHead(307, { Location: '/add-place' });
        response.end(`Successfully added ${comment} as ${positive}`);
      }
    });
  });
  // addReview(user_id, place_id, comment, positive, cb) => {
  // });
}

module.exports = {
  staticHandler,
  placeHandler,
  addPlaceHandler,
};
