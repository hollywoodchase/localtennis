// routes/locations.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');  // Assuming you're using a database module

// Fetch all locations
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM locations');  // Adjust query as needed
        res.json(result.rows);  // Send locations as response
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
