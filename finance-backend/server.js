const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/financeDB")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

console.log("User routes loaded");

app.use("/users", require("./src/routes/userRoutes"));
app.use("/records", require("./src/routes/recordRoutes"));
app.use("/summary", require("./src/routes/summaryRoutes"));


app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => console.log("Server started"));