const HttpStatus = require('http-status-codes');

const refundService = require('../services/refundService');

async function postRefund(req, res, next) {
	try {
		const data = await refundService.postRefund({ ...req.body, cost_price: req.cost_price, item_id: req.item_id });

		return res.status(HttpStatus.StatusCodes.OK).json(data);
	} catch (err) {
		return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(err);
	}
}

module.exports = { postRefund }