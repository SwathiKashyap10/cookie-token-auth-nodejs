const express = require("express");
const router = express.Router();
const {handelUserSignup,handelUserLogin} = require("../controllers/user")
const {verifyToken} = require("../utils/tokenHandeling");
const protect = require("../middelware/protect");

router.post("/",handelUserSignup);
router.post("/login",handelUserLogin);

// Logout route
router.post("/logout", (req, res) => {
  try {
    // Clear the token cookie if stored in cookies
    res.clearCookie("uid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
    });
  }
});


router.get("/check-auth",protect, (req, res) => {
  try {
    const token = req.cookies?.uid;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const verified = verifyToken(token);
    if (!verified) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    return res.status(200).json({ success: true, message: "User authenticated" });

  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/profile",protect, (req, res) => {
  try {
    const token = req.cookies?.uid;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const verified = verifyToken(token);
    if (!verified) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    return res.status(200).json({
      success: true,
      message: "User authenticated",
      user: verified
    });

  } catch (error) {
    console.error("Error in /profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;