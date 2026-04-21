const express = require("express");
const { userAuth, adminAuth } = require("../middleware/auth");

const app = express();

app.get("/user/data", userAuth, (req, res) => {
    try {
        res.send("User data sent successfully");
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
});

app.post("/user/postData", userAuth, (req, res) => {
    try {
        res.send ("User data posted successfully");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/admin/getData", adminAuth, (req, res) => {
    try {
        res.send("Admin data sent successfully");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});



app.listen(2006, () => {
    console.log("Server is successfully listen on path 2006");
});
