var mysql = require('mysql');
// 
// var db_config = {
// host: "35.200.166.236",
// user: "ideal2",
// password: "P@$$2017@d^^!m",
// database: "ideal2",
// port: "3306"

// host: "34.93.126.159",
// user: "ideal2",
// password: "P@$$2017@d^^!m",
// database: "ideal2",
// port: "3306",
// connectionLimit: 1000,
// multipleStatements: true

var db_config = {
    host: "34.93.126.159",
    user: "ideal2",
    password: "P@$$2017@d^^!m",
    database: "ideal2",
    port: "3306",
    connectionLimit: 1000,
    multipleStatements: true
};

// host: "103.58.165.38",
// user: "root",
// password: "root",
// database: "ideal2",
// port: "3306",
// connectionLimit: 1000,
// multipleStatements: true
// };

var pool = mysql.createPool(db_config);
var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        console.log("Succesfully Connected to the Mysql Database")
        callback(err, connection);
    });
};

module.exports = getConnection;