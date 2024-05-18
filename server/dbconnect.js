

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
