const express = require("express");
const app = express();
const connection = require("./connection");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server successfully started on port: ", PORT);
});
