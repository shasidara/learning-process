const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User signed up successfully!");
    } catch (err) {
        res.status(400).send("Something went wrong");
    };
});

app.get("/user", async (req, res) => {
    const users = req.body.email;

    try {
        const user = await User.find({email: users});
        if(!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        };
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
});

app.get("/get", async (req, res) => {
    const user = req.body._id;
    
    try {
        const users = await User.findById({_id: user});
        if(!users) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        };
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if(users.length === 0) {
            res.status(404).send("No users found");
        } else {
            res.send(users);
        };
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
});

app.delete("/user", async (req, res) => {
    const user = req.body._id;

    try {
        const users = await User.findByIdAndDelete({ _id: user });
        if(!users) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully!");
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
});

app.patch("/update/:_id", async (req, res) => {
    const user = req.params?._id;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [ 
            "photoURL",
            "age",
            "gender",
            "skills",
            "about",
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("This update is not allowed");
        }
        if(data?.skills.length > 20) {
            throw new Error("Skills cannot be more than 20 ");
        }

        const users = await User.findByIdAndUpdate({ _id: user }, data, 
            {returnDocument: "beforee"},
            {runValidators: true}
        );
        if(!users) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(500).send("Something went wrong" + err.message);
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
