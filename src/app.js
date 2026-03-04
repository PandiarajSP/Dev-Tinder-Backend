const express = require("express");
const { validateSignup } = require("./utils/validate");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const app = express();
// Middleware for parsing the request into JSON
app.use(express.json())

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
        const isUserPresent = await User.findOne({ emailId: emailId });

        if (!isUserPresent)
            throw new Error("Invalid credentials!");

        const passwordValid = await bcrypt.compare(password, isUserPresent.password);
        if (!passwordValid) {
            throw new Error("Invalid credentials");
        }
        res.send("User Logged in successfully")

    } catch (err) {
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

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send("No users found");
        }
        res.send(users);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after", runValidators: true });
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
connectDB().then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
        console.log("Server running in the port - 3000");
    });
}).catch((err) => {
    console.error("DB connection failed! : ", err);
})

