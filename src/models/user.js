const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 50,
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
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);