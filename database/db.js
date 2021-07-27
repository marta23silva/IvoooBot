require('dotenv').config();
const mysql = require('mysql2/promise');

var pool = mysql.createPool({
	connectionLimit: 10,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

if(pool) {
	console.log('Connected to database!');
} else {
	console.log("Error: can't connect to the database.");
}

module.exports = pool;