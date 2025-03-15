// backend/routes/players.js
const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/", async (req, res) => {
  const {
    fname,
    lname,
    phone,
    email,
    location,
    fplayer,
    rival,
    celebration,
    league,
  } = req.body;

  try {
    const query = `
            INSERT INTO Players (fname, lname, phone, email, location, fplayer, rival, celebration, league_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `;
    const values = [
      fname,
      lname,
      phone,
      email,
      location,
      fplayer,
      rival,
      celebration,
      league,
    ];
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting player:", error);
    res.status(500).json({ error: "Failed to register player." });
  }
});

// Define the shared leagues route properly
router.get("/shared-leagues", async (req, res) => {
  const { player1Id, player2Id } = req.query;

  try {
    const query = `
        SELECT DISTINCT l.leagueid, l.leaguename
        FROM leagues l
        JOIN players p1 ON l.leagueid = p1.league_id
        JOIN players p2 ON l.leagueid = p2.league_id
        WHERE p1.playerid = $1 AND p2.playerid = $2;
      `;
    const result = await db.query(query, [player1Id, player2Id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching shared leagues");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT playerid, fname, lname, phone, email, location, fplayer, rival, celebration, league_id FROM Players"
    );
    res.json(result.rows); // Return players as JSON
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Server error fetching players" });
  }
});

router.get("/by-email", async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  try {
    const query = `
     SELECT 
        p.fname, p.lname, p.location, p.fplayer, p.rival, 
        p.celebration, p.phone, p.email, 
        l.locationname, 
        r.lname AS rival_name, 
        le.leaguename
      FROM users u
      LEFT JOIN players p ON u.username = p.email
      LEFT JOIN locations l ON p.location = l.locationid
      LEFT JOIN players r ON p.rival = r.playerid
      LEFT JOIN leagues le ON p.league_id = le.leagueid
      WHERE u.username = $1;
    `;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(result.rows[0]); // Send the first matching player
  } catch (error) {
    console.error("Error fetching player by email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
