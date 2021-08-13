const mysql = require("mysql2");

const config = require("./config");

const pool = mysql.createPool({
	...config.db.connection,
	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0
});

module.exports = pool;
