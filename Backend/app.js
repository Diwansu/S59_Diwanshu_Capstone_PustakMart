const express = require("express")
const app = express();

require("dotenv").config();
require("./connection/conn");



const port = process.env.PORT || 8080 ;

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})



