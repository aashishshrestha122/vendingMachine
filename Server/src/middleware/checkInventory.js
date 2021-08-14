const billingService = require('../services/billingService');

const checkInventory = async (req, res, next) => {
	var { item_id, sold_qty } = req.body;

	const quantity = await billingService.getInventory();

	const inventoryQuantity = quantity.find(item => item.id === parseInt(item_id));

	if (parseFloat(sold_qty) <= parseFloat(inventoryQuantity.item_quantity)) {
		return next();
	} else {
		return next('Item out of stock');
	}
}

module.exports = { checkInventory }