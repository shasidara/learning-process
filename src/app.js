const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Namaste Shasidara!");
});

app.use("/", (req, res) => {
    res.send("Hello from the server");
});

app.use("/", (req, res) => {
    res.send("Hello hello hello!");
});

app.listen(2006, () => {
    console.log("Server is successfully listen on path 2006");
});