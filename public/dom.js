/* eslint-disable */
var readButton = document.querySelector('.read-btn');
var writeButton = document.querySelector('.write-btn');
var form = document.querySelector('.form');
var places = document.getElementById('places');

var fetchXhr = function(url, callback) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      return callback(null, response);
    } else {
      callback("Server error" + xhr.status);
    }
  });
  xhr.addEventListener("error", function() {
    callback("Server did not respond");
  });
  xhr.open("GET", url, true);
  xhr.send();
};


writeButton.addEventListener('click', function(e) {
  form.style.display = 'flex';
})

readButton.addEventListener('click', function(e) {
  var url = '/list-places';
    fetchXhr(url, function(error, response) {
      if (error) {
        console.error(error);
      } else {
        displayPlaces(response);
      }
    });
});

var displayPlaces = function (response) {
  for (var i = 0; i<response.length; i++){
    var newName = document.createElement('p');
    newName.textContent = response[i].name;
    places.appendChild(newName);
    var newDescription = document.createElement('p');
    newDescription.textContent = response[i].description;
    places.appendChild(newDescription);
    var newReview = document.createElement('p');
    newReview.textContent = response[i].comment;
    places.appendChild(newReview);
  }
}