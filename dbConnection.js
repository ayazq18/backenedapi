const mongoose = require("mongoose")

mongoose.connect(process.env.db_connection)
.then(()=>{
    console.log("db connection success")
})
.catch((err)=>{
    console.log(err.message)
})