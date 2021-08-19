const testFunctions = require('./testFunctions');

test(('Check if there is enough coins or not'), async () => {
	var data = {
		item_price: 20,
		sold_qty: 1,
		total: 100
	}
	expect(await testFunctions.checkChangeTest(data)).toBe('Enough Coins');
});

test(('Check the stock of items'), async () => {
	var data = {
		sold_qty: 1
	}
	expect(await testFunctions.checkInventoryTest(data)).toBe('Items in stock');
});
