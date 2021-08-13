const express = require('express');
const cors = require('cors');

const env = require('./src/env');
const db = require('./src/db');
const config = require('./src/config');

const billingRoutes = require('./src/routes/billingRoutes');
const refundRoutes = require('./src/routes/refundRoutes');

const app = express();
app.use(cors());
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

const PORT = config.app.port;

app.listen(PORT, () => console.log(`Server started on ${PORT}`))