const express = require('express');
const router = express.Router();
const connection = require('../dbconnect');

router.get('/', (req, res) => {
    // Use the connection object to execute the SQL query
    connection.query('SELECT * FROM completed_orders', (error, results, fields) => {
        if (error) {
            // Handle query execution error
            console.error('Error executing query:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send the query results as JSON response
        res.json(results);
    });
});

module.exports = router;
