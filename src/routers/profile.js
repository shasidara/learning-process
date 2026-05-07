const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;

        res.send(user);
    } catch (err) {
        res.status(500).send("Something went wrong!!");
    };
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid data");
        };

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json(`${loggedInUser.firstName}, your profile updated successfully`)
    } catch(err) {
        res.status(500).send("Something went wrong!!" + err.message);
    };
});

module.exports = profileRouter;