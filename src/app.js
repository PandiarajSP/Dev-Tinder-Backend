const express = require("express");
const connectDB = require("./config/database");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
// Middleware for parsing the request into JSON
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
        console.log("Server running in the port - 3000");
    });
}).catch((err) => {
    console.error("DB connection failed! : ", err);
})

