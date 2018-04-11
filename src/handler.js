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

const placeHandler = (response, url) => {
  getPlaces((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(error);
    } else {
      const output = JSON.stringify(res);
      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.end(output);
    }
  });
};

module.exports = {
  staticHandler,
  placeHandler,
  addPlaceHandler,
};
