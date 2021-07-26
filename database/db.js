require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
}).then(() => console.log('Connected to database!')).catch(err => console.log(err));