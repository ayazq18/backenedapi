const express = require("express")
const Route = express.Router();
const {Signup, getalldata, getuser, loginuser, getprofile} = require("../controller/userController")

Route.post("/insertUser", Signup)
Route.get("/getalldata", getalldata)
Route.get("/getuser/:userId", getuser)
Route.post("/login", loginuser)
Route.get("/getprofile/:userid", getprofile)

module.exports = Route;