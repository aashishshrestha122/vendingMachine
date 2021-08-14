const express = require('express');
const cors = require('cors');

const env = require('./src/env');
const db = require('./src/db');
const config = require('./src/config');
const errorHandler = require('./src/middleware/errorHandler');

const billingRoutes = require('./src/routes/billingRoutes');
const refundRoutes = require('./src/routes/refundRoutes');

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000".split(','),
		optionsSuccessStatus: 200
	})
);
app.use(express.json());
app.use('/api/billing', billingRoutes);
app.use('/api/refund', refundRoutes);
app.get('/', (req, res) => {
	res.json({
		app: "Vending Machine",
		description: "Vending machine app",
		author: 'Aashish',
		version: '1.0.0'
	});
});

app.use(errorHandler.genericErrorHandler);

const PORT = config.app.port;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))