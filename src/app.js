const express = require("express");
const user = require("./model/userSchema")
const app = express();
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")


app.use(cors())
app.use(express.json()); //anything imported or any action/request will go to use first and it is mainly used for mddleware.

app.use("/", userRoutes);


module.exports = app;