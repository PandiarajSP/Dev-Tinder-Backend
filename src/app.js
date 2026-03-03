const express = require("express");
const { userAuth } = require("./midldewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
// Middleware for parsing the request into JSON
app.use(express.json())

app.post("/signup", async (req, res) => {
    const request = req.body;
    const user = new User(request);

    try {
        await user.save();
        res.send("User saved");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message)
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
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after" });
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

