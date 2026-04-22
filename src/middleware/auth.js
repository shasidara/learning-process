const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("token is not valid!");
        };

        const decodedData = await jwt.verify(token, "DEV@123");
        const { _id } = decodedData;

        const user = await User.findOne({ _id: _id });
        if(!user) {
            throw new Error("User not found!");
        };

        req.user = user;
        next();
    } catch (err) {
        res.status(500).send("ERROR:" + err.message);
    };
};

module.exports = {
    userAuth
};