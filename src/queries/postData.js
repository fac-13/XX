const databaseConnection = require('../database/db_connection.js');

const addPlace = (name, description, cb) => {
  databaseConnection.query(
    'INSERT INTO places (name, description) VALUES ($1, $2);',
    [name, description],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    },
  );
};

const addReview = (comment, positive, cb) => {
  const now = new Date();
  const reviewDate = `${now.getFullYear()}-${now.getMonth() +
    1}-${now.getDate()}`;
  console.log('reviewDate', reviewDate);
  databaseConnection.query(
    'INSERT INTO reviews (comment, positive, review_date) VALUES ($1, $2, $3);',
    [comment, positive, reviewDate],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    },
  );
};

module.exports = { addPlace, addReview };
