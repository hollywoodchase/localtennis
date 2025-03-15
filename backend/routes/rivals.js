const express = require('express');
const router = express.Router();
const db = require('../db/db');`` // Assuming you have a db module for database connection

// Get all players to populate the rivals dropdown
router.get('/', (req, res) => {
  const query = 'SELECT id, name FROM Players'; // Select relevant columns from Players table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching players for rivals:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send players data as response
  });
});

module.exports = router;
