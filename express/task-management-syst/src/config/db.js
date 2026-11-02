const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    waitForConnections : true,
    connectionLimit: 10,
    queueLimit : 0
})

pool.getConnection()
    .then((connection) => {
        console.log('connected ot mysql db');
        connection.release();
    }).catch((err) => {
        console.error('db connection failed', err.message)
    });


module.exports = pool;
