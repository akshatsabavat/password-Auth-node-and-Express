require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to database successfull"));

app.use(bodyParser.json());
app.use("/users", userRoute);
app.listen(port, () => {
  console.log(`Server live on : ${port}`);
});
