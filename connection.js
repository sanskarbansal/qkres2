var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    user: "be6da9a82aedc1",
    password: "7889d02a",
    database: "heroku_6c3d2e07327fd6c",
    multipleStatements: true,
});

mysql: connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        var sql =
            "CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), username VARCHAR(255), password VARCHAR(255), age VARCHAR(255), dob Date, address VARCHAR(255), phone VARCHAR(255))";
        connection.query(sql);
    }
    console.log("Connected to database");
});

module.exports = connection;
