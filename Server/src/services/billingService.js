const pool = require('../db');
const mysql = require('mysql2');
const knex = require('../../knex/knex');

const postBilling = async (data) => {
	const { item_id, item_price, sold_qty, total, created_by, change } = data;
	var m = new Date();
	var date = m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

	const actualPrice = parseFloat(item_price) * parseInt(sold_qty);

	return new Promise(async (resolve, reject) => {
		if (parseFloat(total) >= parseFloat(actualPrice)) {
			try {
				var bill_id = null;
				await knex.transaction(async function (t) {
					const insertBilling = await t("billing")
						.insert(
							{
								'date': date,
								'item_id': item_id,
								'item_price': item_price,
								'sold_qty': sold_qty,
								'total': total,
								'created_by': created_by,
								'created_on': date,
								'updated_by': created_by,
								'updated_on': date
							}
						)

					bill_id = insertBilling[0];
					const updateInventory = await t.raw(`UPDATE item_inventory SET item_quantity = item_quantity - ${sold_qty} WHERE item_id = ${item_id}`);

					const updatecoin = await updateCoins(actualPrice);

					return resolve({ bill_id: bill_id, amount_received: total, total: actualPrice, change: change });
				})
			} catch (err) {
				return reject(err.message);
			}
		} else {
			return reject("Paid amount doesn't match with total amount");
		}
	})
}

const getInventory = async () => {
	const result = await knex.select('ii.item_id as id', 'ii.item_quantity', 'ii.item_price', 'i.item_name as name')
		.from('item_inventory as ii')
		.leftJoin('items as i', 'i.item_id', 'ii.item_id')

	return result;
}

const checkCoin = async () => {
	const [result] = await knex.select('total_coins').from('coins')

	return result;
}

const updateCoins = async (total) => {
	const coins = await checkCoin();

	const result = await knex('coins').update({ 'total_coins': parseFloat(coins.total_coins) + parseFloat(total) })

	return result;
}
module.exports = { postBilling, getInventory, checkCoin }
