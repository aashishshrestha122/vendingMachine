const checkChangeTest = async (data) => {
	const coin = 100;

	var { item_price, sold_qty, total } = data;

	const actualPrice = parseFloat(item_price) * parseInt(sold_qty);

	total = parseFloat(total);

	if (total >= actualPrice) {
		const change = parseFloat(total) - parseFloat(actualPrice);

		if (coin && change <= coin) {

			return ('Enough Coins');

		} else {

			return ('Not enough coins in the machine');

		}
	} else {

		return ('Paid amount is less than billed amount.');

	}
}

const checkInventoryTest = async (data) => {

	var { sold_qty } = data;

	const quantity = 100;

	if (parseFloat(sold_qty) <= parseFloat(quantity)) {
		return ('Items in stock');
	} else {
		return ('Item out of stock');
	}
}

module.exports = { checkChangeTest, checkInventoryTest }