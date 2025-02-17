// routes/areas.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');  // Assuming you're using a database module

// Fetch all areas
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM areas');  // Adjust query as needed
        res.json(result.rows);  // Send areas as response
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
