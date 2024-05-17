// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Ensure this path is correct



// // Define route to fetch data from the pending_orders table
// router.get('/', (req, res) => {

//     console.log("Im inside routes pending")

//     // Use the connection object to execute the SQL query
//     // connection.query('SELECT * FROM pending_orders', null,(error, results, fields) => {
//     //     if (error) {
//     //         // Handle query execution error
//     //         console.error('Error executing query:', error.message);
//     //         res.status(500).json({ error: 'Internal Server Error' });
//     //         return;
//     //     }
//     //     // Send the query results as JSON response
//     //     res.json(results);
//     // });


//     // connection.query(`
//     //     SELECT BUYER.Buyer_Qty, BUYER.Buyer_Price, SELLER.Seller_Qty, SELLER.Seller_Price
//     //     FROM BUYER
//     //     LEFT JOIN SELLER ON BUYER.BUYER_ID = SELLER.SELLER_ID
//     // `, (error, results, fields) => {
//     //     if (error) {
//     //         // Handle query execution error
//     //         console.error('Error executing query:', error.message);
//     //         res.status(500).json({ error: 'Internal Server Error' });
//     //         return;
//     //     }
//     //     // Send the query results as JSON response
//     //     res.json(results);
//     // });

//     // SELECT buyer.Buyer_Qty, buyer.Buyer_Price, seller.Seller_Qty, seller.Seller_Price
//     // FROM buyer
//     // CROSS JOIN seller ON buyer.BUYER_ID = seller.SELLER_ID OR  buyer.BUYER_ID != seller.SELLER_ID
//     // GROUP BY buyer.Buyer_Price

//     connection.query(`
//     select b.Buyer_Qty, DISTINCT b.Buyer_Price, s.Seller_Qty,DISTINCT s.Seller_Price
//     from buyer b
//     outer join seller s ON b.BUYER_ID = s.SELLER_ID
    
    
// `, (error, results, fields) => {
//         if (error) {
//             // Handle query execution error
//             console.error('Error executing query:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // Process the query results
//         res.json(results); // or whatever you want to do with the results
//     });

// });

// // Export the router
// module.exports = router;



// // Import required modules
// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Ensure this path is correct

// // Define route to fetch data from the pending_orders table
// router.get('/', (req, res) => {
//     console.log("I'm inside routes pending");

//     // Define and execute the SQL query to join buyer and seller tables and fetch data
//     const query = `
//         SELECT
//             b.Buyer_Qty,
//             b.Buyer_Price,
//             s.Seller_Qty,
//             s.Seller_Price
//         FROM
//             (SELECT *, @rownum := @rownum + 1 AS rownum
//              FROM buyer
//              CROSS JOIN (SELECT @rownum := 0) r
//             ) b
//         JOIN
//             (SELECT *, @rownum2 := @rownum2 + 1 AS rownum
//              FROM seller
//              CROSS JOIN (SELECT @rownum2 := 0) r
//             ) s
//         ON s.rownum = b.rownum
//     `;

//     // Execute the query
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             // Handle query execution error
//             console.error('Error executing query:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // Process the query results
//         res.json(results); // or whatever you want to do with the results
//     });
// });

// // Export the router
// module.exports = router;



// reverse empty
// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Ensure this path is correct

// // Define route to fetch data from the pending_orders table
// router.get('/', (req, res) => {
//     console.log("I'm inside routes pending");

//     // Define and execute the SQL query to join buyer and seller tables and fetch data
//     const query = `
//         SELECT
//             COALESCE(b.Buyer_Qty, s.Seller_Qty) AS Buyer_Qty,
//             COALESCE(b.Buyer_Price, s.Seller_Price) AS Buyer_Price,
//             s.Seller_Price,
//             s.Seller_Qty
//         FROM
//             (SELECT
//                  ROW_NUMBER() OVER () AS rownum,
//                  Buyer_Qty,
//                  Buyer_Price
//              FROM buyer
//             ) b
//         LEFT JOIN
//             (SELECT
//                  ROW_NUMBER() OVER () AS rownum,
//                  Seller_Qty,
//                  Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum

//         UNION

//         SELECT
//             b.Buyer_Qty,
//             b.Buyer_Price,
//             COALESCE(s.Seller_Price, b.Buyer_Price) AS Seller_Price,
//             s.Seller_Qty
//         FROM
//             (SELECT
//                  ROW_NUMBER() OVER () AS rownum,
//                  Buyer_Qty,
//                  Buyer_Price
//              FROM buyer
//             ) b
//         RIGHT JOIN
//             (SELECT
//                  ROW_NUMBER() OVER () AS rownum,
//                  Seller_Qty,
//                  Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum;
//     `;

//     // Execute the query
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             // Handle query execution error
//             console.error('Error executing query:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // Process the query results
//         res.json(results); // or whatever you want to do with the results
//     });
// });

// // Export the router
// module.exports = router;




// it just working fine only pending order commin last entry

// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Ensure this path is correct

// // Define route to fetch data from buyer and seller tables
// router.get('/', (req, res) => {
//     console.log("I'm inside routes pending");

//     // Define and execute the SQL query to join buyer and seller tables and fetch data
//     const query = `
//         SELECT
//             COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
//             COALESCE(b.Buyer_Price, '') AS Buyer_Price,
//             COALESCE(s.Seller_Price, '') AS Seller_Price,
//             COALESCE(s.Seller_Qty, '') AS Seller_Qty
//         FROM
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY BUYER_ID) AS rownum,
//                 Buyer_Qty,
//                 Buyer_Price
//              FROM buyer
//             ) b
//         LEFT JOIN
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
//                 Seller_Qty,
//                 Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum

//         UNION

//         SELECT
//             COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
//             COALESCE(b.Buyer_Price, '') AS Buyer_Price,
//             COALESCE(s.Seller_Price, '') AS Seller_Price,
//             COALESCE(s.Seller_Qty, '') AS Seller_Qty
//         FROM
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY BUYER_ID) AS rownum,
//                 Buyer_Qty,
//                 Buyer_Price
//              FROM buyer
//             ) b
//         RIGHT JOIN
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
//                 Seller_Qty,
//                 Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum
//         WHERE b.Buyer_Qty IS NULL
//         OR b.Buyer_Price IS NULL;
//     `;

//     // Execute the query
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             // Handle query execution error
//             console.error('Error executing query:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // Process the query results
//         res.json(results); // or whatever you want to do with the results
//     });
// });

// // Export the router
// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Ensure this path is correct

// // Define route to fetch data from buyer and seller tables
// router.get('/', (req, res) => {
//     console.log("I'm inside routes pending");

//     // Define and execute the SQL query to join buyer and seller tables and fetch data
//     const query = `
//         SELECT
//             COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
//             COALESCE(b.Buyer_Price, '') AS Buyer_Price,
//             COALESCE(s.Seller_Price, '') AS Seller_Price,
//             COALESCE(s.Seller_Qty, '') AS Seller_Qty
//         FROM
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY BUYER_ID DESC) AS rownum,
//                 Buyer_Qty,
//                 Buyer_Price
//              FROM buyer
//             ) b
//         LEFT JOIN
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
//                 Seller_Qty,
//                 Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum

//         UNION

//         SELECT
//             COALESCE(b.Buyer_Qty, '') AS Buyer_Qty,
//             COALESCE(b.Buyer_Price, '') AS Buyer_Price,
//             COALESCE(s.Seller_Price, '') AS Seller_Price,
//             COALESCE(s.Seller_Qty, '') AS Seller_Qty
//         FROM
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY BUYER_ID DESC) AS rownum,
//                 Buyer_Qty,
//                 Buyer_Price
//              FROM buyer
//             ) b
//         RIGHT JOIN
//             (SELECT
//                 ROW_NUMBER() OVER (ORDER BY SELLER_ID) AS rownum,
//                 Seller_Qty,
//                 Seller_Price
//              FROM seller
//             ) s
//         ON b.rownum = s.rownum
//         WHERE b.Buyer_Qty IS NULL
//         OR b.Buyer_Price IS NULL;
//     `;

//     // Execute the query
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             // Handle query execution error
//             console.error('Error executing query:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         // Process the query results
//         res.json(results); // or whatever you want to do with the results
//     });
// });

// // Export the router
// module.exports = router;


//*                        Tansition locking

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
