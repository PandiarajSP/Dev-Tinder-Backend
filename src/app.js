const express = require("express");
const { validateSignup } = require("./utils/validate");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
// Middleware for parsing the request into JSON
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {

    try {
        const { firstName, lastName, emailId, password } = req.body;
        //validate the request
        validateSignup(req.body);
        // Encrypt the password , 10 - SALT rounds (Encrypting rounds using the salt)
        const passwordHashed = await bcrypt.hash(password, 10);

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: passwordHashed
        });

        await user.save();
        res.send("User saved");
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user)
            throw new Error("Invalid credentials!");

        const passwordValid = await user.validatePassword(password);
        if (passwordValid) {
            // Create JWT token
            const token = await user.getJWT();
            console.log(token);
            res.cookie("token", token);
            res.send("User Logged in successfully")
        }
        else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Error : " + err.message);
    }
})

// Get user by email
app.get("/user", async (req, res) => {
    const email = req.body.emailId;

    try {
        // Find only one user for this email (Two users with same email - it returns the one (arbitrary))
        // const result = await User.findOne({ emailId: email });


        // Find users based on email
        const result = await User.find({ emailId: email });
        if (result.length === 0) {
            res.status(404).send("User not found");
        }
        res.send(result);
    } catch (err) {
        res.status(400).send("Something went wrong - " + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {

    const user = req.user;
    if (!user)
        throw new Error("User does not exist");

    res.send(user);
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send("Connection send");
});
connectDB().then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
        console.log("Server running in the port - 3000");
    });
}).catch((err) => {
    console.error("DB connection failed! : ", err);
})

