const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            return res.json({message: "Invalid status"});
        };

        if(fromUserId.equals(toUserId)) {
            return res.status(400).json({ message: "Cannot send connection request to yourself!" });
        };

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.json({message: "User not found"});
        };

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });
        if(existingConnectionRequest) {
            return res.json({message: "Connection request already sent"});
        };

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });
       
        const data =  await connectionRequest.save();

        res.json({ message: status === "interested"
            ? `${req.user.firstName} is interested in you!`
            : `${req.user.firstName} ignored your profile.`,
            data,
        });

    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    };
});

module.exports = requestRouter;