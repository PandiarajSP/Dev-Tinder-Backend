const express = require("express");

const app = express();

// app.use("/hello", (req, res) => {
//     res.send("Hello from Pandi!!");
// });

app.get("/user", (req, res) => {
    res.send("GET api called");
});
app.post("/user", (req, res) => {
    res.send("POST api called");
})
app.put("/user", (req, res) => {
    res.send("PUT api called");
})
app.patch("/user", (req, res) => {
    res.send("PATCH api called");
})
app.delete("/user", (req, res) => {
    res.send("DELETE api called");
})
app.listen(3000, () => {
    console.log("Server running in the port - 3000");
}); 