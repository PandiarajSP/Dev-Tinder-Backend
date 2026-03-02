const express = require("express");
const { userAuth } = require("./midldewares/auth");
const app = express();

// app.use("/", userAuth);

app.get("/user/allData", userAuth, (req, res) => {
    res.send("GET called");
})
app.get("/user/someData", (req, res) => {
    res.send("GET Called for user someData");
})

app.listen(3000, () => {
    console.log("Server running in the port - 3000");
}); 