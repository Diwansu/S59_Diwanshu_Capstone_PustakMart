const router = require("express").Router();
const User = require("./models/user");
const bcrypt = require("bcryptjs");

router.post("/sign-up", async(req,res)=> {
    try{
        const {username,email,password,address} = req.body ;
        if(username.length < 4){
            return res.status(400).json({message: "Username length should be greater than 3"}); 
        }

        const existingUsername = await User.findOne({username : username});
        if(existingUsername){
            return res.status(400).json({message : "Username already exists"});
        }

        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
        return res.status(400).json({message : "Email already exists"});
}

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
            res.status(200).json({message: "SignIn Success."});
        } else {
            res.status(400).json({message:"Invalid credentials" });
        }
    })
   } catch(error) {
    res.status(500).json({message: "Internal server error"});
   }

});


module.exports = router ;
