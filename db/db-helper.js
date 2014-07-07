var mysql = require('mysql');
var config = require('./../config/config.js');

exports.openDb = function(cb) {
    if(config == null) {
        cb('No Config Available to load the database');
        return;
    }

    connection = mysql.createConnection(config.dbURL);

    // a connection can also be implicitly established by invoking a query
    connection.query('USE ' + config.dbName, function (err) {
        if (err) {
            cb('Unable to use the database ['+config.dbName+']');
            return;
        }

        cb(null, connection);
    });
};