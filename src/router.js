const request = require("request");
const queryString = require('querystring');
const { staticHandler, placeHandler, addPlaceHandler } = require("./handler");
const addPlace = require('./queries/postData');
const fs = require('fs');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    console.log(url);
    staticHandler(response, 'public/index.html');
  } else if (url.indexOf('public')!== -1) {
    staticHandler(response, url);
  } else if (url==='/list-places'){
    placeHandler(response, url);
  } else if (url.indexOf("add-place") !== -1) {
    console.log('this is url: ', url);
    // const name = url.split("=")[1].split("&")[0];
    // const description = url.split("=")[2];
    // addPlaceHandler(name, description, response);
    let data = '';
    request.on('data', function(chunk) {
      data += chunk ; 
    });
    request.on('end', ()=> {
      const name = queryString.parse(data).name;
      const description = queryString.parse(data).description;
      addPlace(name, description, (err, res) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/html' });
          response.end('<h1>sorry</h1>');
          console.log(err)
        }
      });
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      fs.readFile(__dirname + "/../public/index.html", function(error, file){
        if(error) {
          console.log(error);
          return
        } else {
          response.end(file)
        }
      })
    })
  } else {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("404 error");
  }
};

module.exports = router;
