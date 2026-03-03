const express = require("express");
const { userAuth } = require("./midldewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Pandiaraj",
        lastName: "SP",
        emailId: "pandi@gmail.com",
        password: 21234
    });

    try {
        await user.save();
        res.send("User saved");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message)
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

