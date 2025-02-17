const express = require("express");
const router = express.Router();
const db = require("../db/db"); // Database connection module

// Fetch match data with player names and league name
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT m.matchid, CONCAT(p1.fname, ' ', p1.lname) AS player1, CONCAT(p2.fname, ' ', p2.lname) AS player2, l.leaguename AS league, m.match_date, m.match_result FROM Matches m JOIN Players p1 ON m.player1_id = p1.playerid JOIN Players p2 ON m.player2_id = p2.playerid LEFT JOIN Leagues l ON m.league_id = l.leagueid;"
    );
    
    // Send the query results back as a JSON response
    res.status(200).json(result.rows);  // Assuming result.rows is the data you want
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Server error fetching scores" });
  }
});

router.post("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Received request body:", req.body);

  const player1 = parseInt(req.body.player1, 10);
  const player2 = parseInt(req.body.player2, 10);
  const league = req.body.league ? parseInt(req.body.league, 10) : null;
  const { matchResult } = req.body;

  if (isNaN(player1) || isNaN(player2)) {
    console.error("Invalid player IDs:", { player1, player2 });
    return res.status(400).json({ error: "Invalid player IDs" });
  }

  const query = `
    INSERT INTO Matches (player1_id, player2_id, league_id, match_date, match_result)
    VALUES ($1, $2, $3, NOW(), $4)
  `;

  console.log("Executing query:", query, [player1, player2, league, matchResult]);
  
  db.query(
    {
      text: query,
      values: [player1, player2, league, matchResult],
      statement_timeout: 5000, // Timeout in milliseconds
    },
    (err) => {
      if (err) {
        console.error("Error or timeout in query:", err);
        return res.status(500).json({ error: "Database error or timeout" });
      }
      res.status(201).json({ message: "Score submitted successfully" });
    }
  );
  
  
});




module.exports = router;
