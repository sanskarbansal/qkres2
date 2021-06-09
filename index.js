require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./connection");
const PORT = process.env.PORT || 8080;

const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", require("./api/user"));
app.listen(PORT, () => {
    console.log("Server successfully started on port: ", PORT);
});
