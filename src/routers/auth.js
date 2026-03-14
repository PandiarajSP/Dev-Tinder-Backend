const express = require("express");
const authRouter = express.Router();

const { validateSignup } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {

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

authRouter.post("/login", async (req, res) => {

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

module.exports = authRouter;
