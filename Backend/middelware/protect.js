const jwt = require("jsonwebtoken");
const {verifyToken} = require("../utils/tokenHandeling")

async function protect(req, res, next) {
  try {
    const token = req.cookies?.uid; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token found",
      });
    }

    // Verify token
    const decoded = verifyToken(token);

     if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }

    // Attach user info from token to request
    req.user = decoded; // usually contains { id, email, name }

    next(); // allow request to continue
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
}

module.exports = protect;

