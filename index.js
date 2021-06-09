require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./connection");
const PORT = process.env.PORT || 8080;
const path = require("path");

const cors = require("cors");

// app.use(
//     cors({
//         origin: "https://qkressb.herokuapp.com",
//     })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/", require("/api/user"));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build"));
});

app.listen(PORT, () => {
    console.log("Server successfully started on port: ", PORT);
});
