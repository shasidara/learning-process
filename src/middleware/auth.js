const adminAuth = (req, res, next) => {
    try {
        const token = "xyz";
        const isAuthorized = token === "xyz";
        if (!isAuthorized) {
            res.status(401).send("Unauthorized");
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
};

const userAuth = (req, res, next) => {
    try {
        const token = "xyz";
        const isAuthorized = token === "xyz";
        if (!isAuthorized) {
            res.status(401).send("Unauthorized");
        } else { 
            next();
        };
    } catch (err) {
        res.status(500).send("Something went wrong");
    };
};

module.exports = {
    adminAuth,
    userAuth
};