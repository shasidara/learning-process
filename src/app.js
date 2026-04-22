const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;

        const passwordHash =  await bcrypt.hash(password, 10);

        const user = new User({
            firstName, 
            lastName,
            email,
            password: passwordHash,
        });

        await user.save();
        res.send("User signed up successfully!");
    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    };
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email});
        if(!user) {
            throw new Error("Invalid credentials");
        };

        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = await user.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.send("User logged in successfully!");
        
    } catch (err) {
        res.status(500).send("ERROR:" + err.message);
    };
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch (err) {
        res.status(500).send("ERROR:" + err.message);
    };
});

connectDB().then(() => {
        console.log("Database connected successfully!");
        app.listen(2006, () => {
        console.log("Server is successfully listen on path 2006...");
    });
}).catch((err) => {
    console.error("Database is not connected!!", err.message);
});
