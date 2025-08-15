const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(user){
    return jwt.sign({
      _id:user._id,
      name:user.name,
      email:user.email
    },process.env.JWT_SECRET);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // token is valid, return decoded payload
  } catch (err) {
    // token invalid or expired
    return null;
  }
}

module.exports = {generateToken,verifyToken};