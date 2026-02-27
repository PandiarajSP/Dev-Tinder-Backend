const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello from Pandi!!");
});

app.listen(3000, () => {
    console.log("Server running in the port - 3000");
});