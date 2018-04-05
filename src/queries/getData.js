const dbConnection = require('../database/db_connection.js');

const getPlaces = (cb) => {
    dbConnection.query(`SELECT * FROM places`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = { getPlaces };