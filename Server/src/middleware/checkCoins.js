const billingService = require('../services/billingService');
const refundService = require('../services/refundService');

const checkCoins = async (req, res, next) => {
	var { bill_id, return_quantity } = req.body;

	const billing = await refundService.checkBilling(bill_id);
	if (billing.length) {

		const coin = await billingService.checkCoin();

		const total_price = parseFloat(billing[0].item_price) * parseFloat(return_quantity);

		if (parseFloat(total_price) <= parseFloat(coin[0].total_coins)) {
			req.cost_price = billing[0].item_price;
			req.item_id = billing[0].id;
			return next();
		} else {
			return next('Not enough coins in the machine for the refund.');
		}
	} else {
		return next('Invalid Billing Id.');
	}
}

module.exports = { checkCoins }