require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedUser) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token. Please sign in again" });
      }

      

      req.user = decodedUser; // Assign the decoded user object to req.user
      next();
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "An internal error occurred during authentication." });
  }
};

module.exports = { authenticateToken };
