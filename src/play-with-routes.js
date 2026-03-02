// Whenever the response send at that time, execution stops
// Also grouping the call back functions 
app.get("/user", (req, res, next) => {
    // res.send("Response from 1");
    console.log("response from 1");
    next();
}, [(req, res, next) => {
    // res.send("response from 2");
    console.log("Response from 2");
    next();
}, (req, res) => {
    res.send("response from 3");
}])