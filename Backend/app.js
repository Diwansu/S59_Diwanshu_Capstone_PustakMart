const express = require("express")
const app = express();

require("dotenv").config();
require("./connection/conn");
const user = require("./routes/user");

app.use(express.json());

app.use("/ap1/v1", user) ;



const port = process.env.PORT || 8080 ;

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})



