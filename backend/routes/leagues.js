// backend/routes/leagues.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');  // Assuming db module exports a connection or query function

// GET /api/leagues - Retrieve leagues from the database
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT leagueid, leaguename FROM Leagues'); // Adjust table/column names as needed
        res.json(result.rows);  // Access rows directly from the result object
    } catch (error) {
        console.error('Error fetching leagues:', error);
        res.status(500).json({ message: 'Server error fetching leagues' });
    }
});

module.exports = router;
