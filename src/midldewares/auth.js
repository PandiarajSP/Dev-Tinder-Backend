const userAuth = (req, res, next) => {
    let token = "XYZ";
    if (token !== "XYZ") {
        res.status(401).message("unauthorized");
    }
    console.log("User authenticated");
    next();
}

module.exports = {
    userAuth
}