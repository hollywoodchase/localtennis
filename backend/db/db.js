// db/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Set this in your .env file
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};



