const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

require("../dbConnection")
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Port is running on"+" "+ PORT);
})