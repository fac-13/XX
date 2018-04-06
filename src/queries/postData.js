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

module.exports = addPlace;
