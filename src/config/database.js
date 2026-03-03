const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://pandi_node_user:pAnDiNoDeUsEr@cluster0.04qpjnl.mongodb.net/devTinder");
}
module.exports = connectDB;
