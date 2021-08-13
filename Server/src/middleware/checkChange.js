const billingService = require('../services/billingService');

const checkChange = async (req, res, next) => {
	var { item_price, sold_qty, total } = req.body;

	const actualPrice = parseFloat(item_price) * parseInt(sold_qty);

	total = parseFloat(total);

	if (total >= actualPrice) {
		const change = parseFloat(total) - parseFloat(actualPrice);

		const coin = await billingService.checkCoin();

		if (change <= coin) {
			req.change = change;
			return next();
		} else {
			return next('Not enough coins in the machine');
		}
	} else {
		return next('Paid amount is less than billed amount.');
	}
}

module.exports = { checkChange }