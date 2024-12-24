const express = require("express")
const app = express();

require("dotenv").config();
require("./connection/conn");
const user = require("./routes/userRoutes");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
app.use(express.json());

app.use("/ap1/v1", user) ;
app.use("/api/v1" , Books);
app.use("/api/v1" , Favourite);




const port = process.env.PORT || 8080 ;

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})



