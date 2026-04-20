const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({ name: "Shasidara", age: 20 });
});

app.post("/user", (req, res) => {
    console.log("User created successfully");
    res.send("User created successfully");
});

app.delete("/user", (req, res) => {
    res.send("User deleted successfully");
});

app.listen(2006, () => {
    console.log("Server is successfully listen on path 2006");
});