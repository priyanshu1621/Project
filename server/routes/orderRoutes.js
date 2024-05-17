// // Import required modules
// const express = require('express');
// const router = express.Router();
// const connection = require('../dbconnect'); // Import your MySQL connection

// // Define route to handle searching for data in the seller table
// router.post('/create-order', async (req, res) => {


//     const { buyerQuantity, buyerPrice } = req.body; // Destructure buyerQuantity and buyerPrice directly from req.body

//     // Log the received data for debugging
//     console.log("Received data from frontend:", { buyerQuantity, buyerPrice });


//     // //   const { buyerQuantity, buyerPrice } = req.body;
//     // console.log("Body", req.body)

//     // const { buyerQuantity } = req.body.buyerQuantity;

//     // console.log("inside server buyer quan", buyerQuantity)
//     //   console.log("inside server buyer price", buyerPrice)


//     try {
//         // Search for data in the seller table based on buyerQuantity and buyerPrice
//         const query = 'SELECT * FROM seller WHERE Seller_Qty = ? AND Seller_Price = ?';
//         const values = [buyerQuantity, buyerPrice];

//         connection.query(query, values, (error, results, fields) => {
//             if (error) {
//                 console.error('Error searching data:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }

//             if (results.length > 0) {
//                 console.log('Data found in the seller table:', results);

//                 // Insert data into the completed_orders table
//                 const completedOrderQuery = 'INSERT INTO completed_orders (price, quantity) VALUES (?, ?)';
//                 const completedOrderValues = [buyerPrice, buyerQuantity];

//                 connection.query(completedOrderQuery, completedOrderValues, (error, results, fields) => {
//                     if (error) {
//                         console.error('Error inserting data into completed_orders table:', error);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                         return;
//                     }
//                     console.log('Data inserted into completed_orders table:', results);
//                 });

//                 res.json({ found: true, data: results });
//             } else {
//                 console.log('Data not found in the seller table');
//                 res.json({ found: false });
//             }
//         });
//     } catch (error) {
//         console.error('Error searching data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Export the router
// module.exports = router;


// Import required modules
const express = require('express');
const router = express.Router();
const connection = require('../dbconnect'); // Import your MySQL connection

// Define route to handle searching for data in the seller table
router.post('/create-order', async (req, res) => {
    const { buyerQuantity, buyerPrice } = req.body; // Destructure buyerQuantity and buyerPrice directly from req.body

    try {
        // Search for data in the seller table based on buyerQuantity and buyerPrice
        const query = 'SELECT * FROM seller WHERE Seller_Qty >= ? AND Seller_Price = ?';
        const values = [buyerQuantity, buyerPrice];

        connection.query(query, values, async (error, results, fields) => {
            if (error) {
                console.error('Error searching data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (results.length > 0) {
                // Case 1: Sellers found with the same price and sufficient quantity as the buyer
                console.log('Case 1: Sellers found with the same price and sufficient quantity as the buyer:', results);

                // Insert data into the completed_orders table
                const completedOrderQuery = 'INSERT INTO completed_orders (price, quantity) VALUES (?, ?)';
                const completedOrderValues = [buyerPrice, buyerQuantity];

                connection.query(completedOrderQuery, completedOrderValues, (error, results, fields) => {
                    if (error) {
                        console.error('Error inserting data into completed_orders table:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }
                    console.log('Data inserted into completed_orders table:', results);
                });

                // Delete the entry from the seller table
                const deleteQuery = 'DELETE FROM seller WHERE Seller_Qty = ? AND Seller_Price = ?';
                const deleteValues = [buyerQuantity, buyerPrice];

                connection.query(deleteQuery, deleteValues, (error, results, fields) => {
                    if (error) {
                        console.error('Error deleting entry from seller table:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }
                    console.log('Entry deleted from seller table:', results);
                });

                // Insert data into the buyer table
                const buyerInsertQuery = 'INSERT INTO buyer (Buyer_Price, Buyer_Qty) VALUES (?, ?)';
                const buyerInsertValues = [buyerPrice, buyerQuantity];

                connection.query(buyerInsertQuery, buyerInsertValues, (error, results, fields) => {
                    if (error) {
                        console.error('Error inserting data into buyer table:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }
                    console.log('Data inserted into buyer table:', results);
                });

                res.json({ found: true, message: 'Order successfully fulfilled' });
            } else {
                // Case 2: No sellers found with the same price and sufficient quantity as the buyer
                console.log('Case 2: No sellers found with the same price and sufficient quantity as the buyer');

                // Search for buyer price inside the seller table
                const searchQuery = 'SELECT * FROM seller WHERE Seller_Price = ?';
                const searchValues = [buyerPrice];

                connection.query(searchQuery, searchValues, (error, results, fields) => {
                    if (error) {
                        console.error('Error searching data in seller table:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    if (results.length > 0) {
                        // Sellers found with the same price but insufficient quantity as the buyer
                        console.log('Sellers found with the same price but insufficient quantity as the buyer:', results);

                        // Calculate total quantity available from these sellers
                        let totalQuantityAvailable = 0;
                        for (const seller of results) {
                            totalQuantityAvailable += seller.Seller_Qty;
                        }

                        // Insert data into the completed_orders table for the fullfilled quantity
                        const completedOrderQuery = 'INSERT INTO completed_orders (price, quantity) VALUES (?, ?)';
                        const completedOrderValues = [buyerPrice, totalQuantityAvailable];

                        connection.query(completedOrderQuery, completedOrderValues, (error, results, fields) => {
                            if (error) {
                                console.error('Error inserting data into completed_orders table:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                                return;
                            }
                            console.log('Data inserted into completed_orders table:', results);
                        });

                        // Insert remaining buyer quantity into the buyer table
                        const remainingQuantity = buyerQuantity - totalQuantityAvailable;
                        if (remainingQuantity > 0) {
                            const buyerInsertQuery = 'INSERT INTO buyer (Buyer_Price, Buyer_Qty) VALUES (?, ?)';
                            const buyerInsertValues = [buyerPrice, remainingQuantity];

                            connection.query(buyerInsertQuery, buyerInsertValues, (error, results, fields) => {
                                if (error) {
                                    console.error('Error inserting data into buyer table:', error);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                    return;
                                }
                                console.log('Data inserted into buyer table:', results);
                            });
                        }

                        // Delete the entry from the seller table
<<<<<<< HEAD
                        const deleteQuery = 'DELETE FROM seller WHERE Seller_Price = ? ';
=======
                        const deleteQuery = 'DELETE FROM seller WHERE Seller_Price = ? limit 1';
>>>>>>> c18c9a7da97f2d6b33160984e11f7931895e3f4e
                        const deleteValues = [buyerPrice];

                        connection.query(deleteQuery, deleteValues, (error, results, fields) => {
                            if (error) {
                                console.error('Error deleting entry from seller table:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                                return;
                            }
                            console.log('Entry deleted from seller table:', results);
                        });

                        res.json({ found: true, message: 'Order successfully fulfilled' });
                    } else {
                        // No sellers found with the same price as the buyer
                        console.log('No sellers found with the same price as the buyer');
                        res.json({ found: false, message: 'No sellers found with the same price as the buyer' });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;

