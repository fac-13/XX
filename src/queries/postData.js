const databaseConnection = require('../../database/db_connection.js');

const addPlace = (name, address, tel, website, description, picture, cb) => {
  databaseConnection.query(
    'INSERT INTO users (name, address, phone_number, website, description, picture) VALUES ($1, $2, $3, $4, $5, $6)',
    [name],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    },
  );
};

module.exports = addPlace;
