const mongoose = require("mongoose");

const URL = "mongodb+srv://Uday:urraj@cluster0.hqxku.mongodb.net/flexpos";

mongoose.connect(URL);

let connectionobj = mongoose.connection;

connectionobj.on("connected", () => {
  console.log("Connected  Successfully to database..!");
});

connectionobj.on("error", () => {
  console.log("Connection to database failed");
});
