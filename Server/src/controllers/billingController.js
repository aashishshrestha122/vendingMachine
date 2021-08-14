const HttpStatus = require('http-status-codes');

const billingService = require('../services/billingService');

async function postBilling(req, res, next) {
	try {
		const data = await billingService.postBilling({ ...req.body, change: req.change });

		return res.status(HttpStatus.StatusCodes.OK).json(data);
	} catch (err) {
		return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(err);
	}
}

async function fetchInventory(req, res, next) {
	try {
		const data = await billingService.getInventory();

		return res.status(HttpStatus.StatusCodes.OK).json(data);
	} catch (err) {
		return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(err);
	}
}

module.exports = { postBilling, fetchInventory }