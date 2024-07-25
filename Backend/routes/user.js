const router = require("express").Router();
require("dotenv").config();
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require('./userAuth')

async function checkIfExists(username,email){
    const existingUser = await User.findOne({
        $or : [
            {username : username},
            {email : email}
        ]
    });
    return existingUser;
}

router.post("/sign-up", async(req,res)=> {
    try{
        const {username: rawUsername,email:rawEmail,password,address} = req.body ;
          const username = rawUsername.trim();
          const email = rawEmail.trim();

        if(username.length < 4){
            return res.status(400).json({message: "Username length should be greater than 3"}); 
        }

        const existingUser = await checkIfExists(username,email);
        if(existingUser) {
            if(existingUser.username === username){
            return res.status(400).json({message : "Username already exists"});
        }

       
        if(existingUser.email === email){
        return res.status(400).json({message : "Email already exists"});
}}

if(password.length <= 5) {
    return res.status(400).json({message : "Password's Length must be greater than 5."});
}

const hashedPassword = await bcrypt.hash(password,10);

const newUser = new User({
  username: username,
  email: email,
  password: hashedPassword,
  address: address,
});

await newUser.save();
return res.status(200).json({message : "Signup Successfully"});
    }catch(error){
     res.status(500).json({message : "Internal server error"});
    }
})

router.post("/sign-in", async (req,res)=> {
   try{
    const {username,password} = req.body ;
    const existingUser = await User.findOne({username });
    if(!existingUser){
        res.status(400).json({message : "Invalid credentials."});
    }
    await bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data) {
            const authClaims = {
                name:existingUser.username,
                role : existingUser.role}
            ;
            const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
              expiresIn: "30d",
            });

            res.status(200).json({
              id: existingUser._id,
              role: existingUser.role,
              token: token,
            });
        } else {
            res.status(400).json({message:"Invalid credentials" });
        }
    })
   } catch(error) {
    res.status(500).json({message: "Internal server error"});
   }

});

router.get("/get-user-information",authenticateToken, async(req,res)=>{
    try{
      const {id} = req.headers;
      const data = await User.findById(id).select("-password");
      return res.status(200).json(data);
    } catch(error){
        console.error('Error details:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

router.put("/update-address", authenticateToken,async(req,res)=>{
    try{
        const{id} = req.headers;
        const {address} = req.body ;
        await User.findByIdAndUpdate(id,{address: address});
        return res.status(200).json({message : "Address Updated Successfully."});

    } catch(error){
        console.error('Error details:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router ;
