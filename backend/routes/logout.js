const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    // Destroy session if using sessions
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Clear session cookie
        return res.json({ success: true, message: "Logged out successfully" });
      });
    } else {
      return res.json({ success: true, message: "No active session found" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
