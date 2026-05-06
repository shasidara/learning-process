const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try{
        validateSignupData(req);
        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        await user.save();
        res.send("User signed up successfully!");
    } catch(err) {
        res.status(400).send("Something went wrong!!!" + err.message);
    };
});

authRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email: email});
        if(!user) {
            throw new Error("Invalid credentials");
        };

        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials!");
        };

        const token = await user.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.send("User logged successfully!");
    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    };
});

module.exports = authRouter;