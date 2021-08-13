const config = {
	app: {
		port: process.env.PORT || '5000',
	},
	db: {
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || 'vendingmachine'
		}
	}
}

module.exports = config;