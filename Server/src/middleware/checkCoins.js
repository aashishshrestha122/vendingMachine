const billingService = require('../services/billingService');
const refundService = require('../services/refundService');

const checkCoins = async (req, res, next) => {
	var { bill_id, return_quantity } = req.body;

	const billing = await refundService.checkBilling(bill_id);
	if (billing && !billing.is_refunded) {

		const coin = await billingService.checkCoin();

		const total_price = parseFloat(billing.item_price) * parseFloat(return_quantity);

		if (parseFloat(total_price) <= parseFloat(coin.total_coins)) {
			req.cost_price = billing.item_price;
			req.item_id = billing.id;
			return next();
		} else {
			return next('Not enough coins in the machine for the refund.');
		}
	} else {
		if (billing && billing.is_refunded === 1) {
			return next('Bill already refunded');
		} else {
			return next('Invalid Billing Id.');
		}
	}
}

module.exports = { checkCoins }