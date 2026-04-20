const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
    console.log("route 1");
    next();
    res.send("Response 1");
}, 
(req, res, next) => {
    console.log("route 2");
    next();
},
(req, res, next) => {
    console.log("route 3");
    next();
});

app.listen(2006, () => {
    console.log("Server is successfully listen on path 2006");
});