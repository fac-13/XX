const databaseConnection = require('../../database/db_connection.js');

const addUser = (name, cb) => {
  databaseConnection.query(
    'INSERT INTO users (name) VALUES ($1)',
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

module.exports = addUser;
