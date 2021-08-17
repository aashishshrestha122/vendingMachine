module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || 'vendingmachine',
			charset: 'utf8'
		}
	},
	migrations: {
		directory: __dirname + '/knex/migrations',
	},
	seeds: {
		directory: __dirname + '/knex/seeds'
	}
};