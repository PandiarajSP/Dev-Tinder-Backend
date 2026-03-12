const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://pandi_node_user:pAnDiNoDeUsEr@ac-wby11cb-shard-00-00.04qpjnl.mongodb.net:27017,ac-wby11cb-shard-00-01.04qpjnl.mongodb.net:27017,ac-wby11cb-shard-00-02.04qpjnl.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-12dezi-shard-0&authSource=admin&retryWrites=true&w=majority");
}

module.exports = connectDB;