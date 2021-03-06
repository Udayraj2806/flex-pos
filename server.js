const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();

app.use(express.json());
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/userRoute");
const billsRoute = require("./routes/billsRoute");

app.use("/api/items/", itemsRoute);
app.use("/api/user/", usersRoute);
app.use("/api/bills/", billsRoute);
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;
// mongodb+srv://Uday:flexposapp@cluster0.hqxku.mongodb.net/test
app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Listening to port ${port} `));
