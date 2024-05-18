
const express = require('express');
const router = express.Router();
const connection = require('../dbconnect'); // Ensure this path is correct

// Define route to fetch data from buyer and seller tables
router.get('/pending-order', (req, res) => {
    console.log("I'm inside routes pending");

    // Start a transaction
    connection.beginTransaction((beginTransactionErr) => {
        if (beginTransactionErr) {
            console.error('Error starting transaction:', beginTransactionErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Define and execute the SQL query to fetch data from buyer and seller tables with locking
        const query = `
            SELECT
                COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
                COALESCE(b.Buyer_Price, '') AS Buyer_Price,
                COALESCE(s.Seller_Price, '') AS Seller_Price,
                COALESCE(s.Seller_Qty, '') AS Seller_Qty
            FROM
                (SELECT
                    ROW_NUMBER() OVER (ORDER BY BUYER_ID DESC) AS rownum,
                    Buyer_Qty,
                    Buyer_Price
                FROM buyer
                FOR UPDATE
                ) b
            LEFT JOIN
                (SELECT
                    ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
                    Seller_Qty,
                    Seller_Price
                FROM seller
                FOR UPDATE
                ) s
            ON b.rownum = s.rownum

            UNION

            SELECT
                COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
                COALESCE(b.Buyer_Price, '') AS Buyer_Price,
                COALESCE(s.Seller_Price, '') AS Seller_Price,
                COALESCE(s.Seller_Qty, '') AS Seller_Qty
            FROM
                (SELECT
                    ROW_NUMBER() OVER (ORDER BY BUYER_ID DESC) AS rownum,
                    Buyer_Qty,
                    Buyer_Price
                FROM buyer
                FOR UPDATE
                ) b
            RIGHT JOIN
                (SELECT
                    ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
                    Seller_Qty,
                    Seller_Price
                FROM seller
                FOR UPDATE
                ) s
            ON b.rownum = s.rownum
            WHERE b.Buyer_Qty IS NULL
            OR b.Buyer_Price IS NULL;
        `;

        // Execute the query
        connection.query(query, (error, results, fields) => {
            if (error) {
                // Rollback the transaction if there's an error
                console.error('Error executing query:', error.message);
                connection.rollback(() => {
                    console.error('Transaction rolled back.');
                    res.status(500).json({ error: 'Internal Server Error' });
                });
                return;
            }

            // Commit the transaction if there are no errors
            connection.commit((commitErr) => {
                if (commitErr) {
                    console.error('Error committing transaction:', commitErr.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                // Process the query results
                res.json(results); // or whatever you want to do with the results
            });
        });
    });
});

// Export the router
module.exports = router;
