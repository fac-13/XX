const dbConnection = require('../database/db_connection.js');

const getPlaces = (cb) => {
    dbConnection.query(`SELECT places.name, places.description, reviews.comment FROM places INNER JOIN reviews ON reviews.place_id=places.id;`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = { getPlaces };