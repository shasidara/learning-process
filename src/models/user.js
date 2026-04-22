const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            };
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 500,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password");
            };
        },
    },
    age: {
        type: Number,
        trim: true,
        min: 4,
    },
    gender: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 10,
        validate(value) {
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Gender is not valid");
            };
        },
    },
    photoURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        trim: true,
    },
    skills: {
        type: [String],
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    about: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 500,
    },
},{
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user =  this;

    const token = await jwt.sign({ _id: user._id }, "DEV@123", { expiresIn: "1d" });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user =  this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);