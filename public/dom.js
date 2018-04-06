/* eslint-disable */
var viewButton = document.querySelector('.view-btn');
var reviewButton = document.querySelector('.review-btn');
var reviewForm = document.querySelector('#review-form');
var form = document.querySelector('.form');
var places = document.getElementById('places');
var topButtons  = document.querySelector('.top-buttons');


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


reviewButton.addEventListener('click', function(e) {
  reviewForm.removeAttribute('hidden');
  topButtons.style.display = "none";
});


viewButton.addEventListener('click', function(e) {
  var url = '/list-places';
    fetchXhr(url, function(error, response) {
      if (error) {
        console.error(error);
      } else {
        topButtons.style.display = "none";
        places.removeAttribute('hidden');
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