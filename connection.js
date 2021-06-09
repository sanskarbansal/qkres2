var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "silog",
    multipleStatements: true,
});

connection.connect((error) => {
    if (error) {
        console.log(error);
        // console.log("Error while connecting to database");
    } else {
        console.log("Connected to database");
    }
});

connection.end();

module.exports = connection;
