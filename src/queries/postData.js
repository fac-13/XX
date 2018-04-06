const databaseConnection = require('../database/db_connection.js');

const addPlace = (name, description, cb) => {
  databaseConnection.query(
    'INSERT INTO places (name, description) VALUES ($1, $2);',
    [name, description],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    });
};

const addReview = (user_id, place_id, comment, positive, cb) => {
    let review_date = new Date();
    let dd = review_date.getDay();
    let mm = review_date.getMonth();
    let year = review_date.getYear();
    review_date = year+'-'+mm+'-'+dd;
    console.log(review_date);
    databaseConnection.query(
      'INSERT INTO reviews (user_id, place_id, comment, positive, review_date) VALUES ($1, $2, $3, $4, $5);',
      [user_id, place_id, comment, positive, review_date],
      (err, res) => {
        if (err) {
          return cb(err);
        } else {
          cb(null, res);
        }
      });
  };

module.exports = { addPlace, addReview };

