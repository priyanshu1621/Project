// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Jaipur@19',
//     database: `order_matching_system`
//  });
 
//  connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as id ' + connection.threadId);
//  });


//  module.exports = connection;

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bvmlqvwmx0ftv2aqkff0-mysql.services.clever-cloud.com',
    user: 'udpc9pjnoik2ynwc',
    password: 'eMZhdKR0ixw17vYLHKYz',
    database: `bvmlqvwmx0ftv2aqkff0`
 });
 
 connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
 });


 module.exports = connection; 