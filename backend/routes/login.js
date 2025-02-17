const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const userResult = await db.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid login" });
    }

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, userResult.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid login" });
    }

    // ✅ Fetch Player Details
    const playerQuery = "SELECT * FROM Players WHERE email = $1";
    const playerResult = await db.query(playerQuery, [username]);
    console.log("REQ1")
    console.log(req)
    if (playerResult.rows.length > 0) {
      req.session.loggedInPlayer = playerResult.rows[0]; // ✅ Store in session
    }

    res.json({ success: true, player: playerResult.rows[0] });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Route to get logged-in player profile
router.get("/profile", (req, res) => {
  if (!req.session || !req.session.loggedInPlayer) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.session.loggedInPlayer);
});

module.exports = router;


module.exports = router;
