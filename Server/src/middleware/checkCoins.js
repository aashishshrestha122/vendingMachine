const billingService = require('../services/billingService');
const refundService = require('../services/refundService');

const checkCoins = async (req, res, next) => {
	var { item_id, return_quantity } = req.body;


	const coin = await billingService.checkCoin();

	const costprice = await refundService.getCostPrice(item_id);

	const total_price = parseFloat(costprice) * parseFloat(return_quantity);

	if (parseFloat(total_price) <= parseFloat(coin)) {
		req.cost_price = costprice;
		return next();
	} else {
		return next('Not enough coins in the machine for the refund.');
	}
}

module.exports = { checkCoins }