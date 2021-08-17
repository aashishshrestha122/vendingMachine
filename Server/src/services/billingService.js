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
				return await knex.transaction(async function (t) {
					return knex("billing")
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
						.then(async function (response) {
							if (response.length) {
								return knex('item_inventory').select('item_quantity').where('item_id', item_id)
							}
						})
						.then(async function (itemQuantity) {
							if (itemQuantity.length) {
								const quantity = itemQuantity[0].item_quantity;
								return knex('item_inventory')
									.update({
										'item_quantity': parseInt(quantity) - parseInt(sold_qty)
									})
									.where({ 'item_id': item_id })
							}
						})
						.then(async function (updateQuantity) {
							if (updateQuantity) {
								const updatecoin = await updateCoins(actualPrice);
								if (updatecoin) {
									return resolve({ amount_received: total, total: actualPrice, change: change });
								}
							}
						})
						.then(t.commit)
						.catch(t.rollback)
				})
			} catch (err) {
				return reject(err);
			}
		} else {
			return reject("Paid amount doesn't match with total amount");
		}
	})
}

const getInventory = async () => {
	const result = [];
	await knex.select('ii.item_id as id', 'ii.item_quantity', 'ii.item_price', 'i.item_name as name')
		.from('item_inventory as ii')
		.leftJoin('items as i', 'i.item_id', 'ii.item_id')
		.then(data => {
			data.forEach(function (value) {
				result.push(value)
			});
		}
		);
	return result;
}

const checkCoin = async () => {
	const result = [];
	await knex.select('total_coins')
		.from('coins')
		.then(data => {
			data.forEach(function (value) {
				result.push(value)
			});
		}
		);
	return result;
}

const updateCoins = async (total) => {
	const coins = await checkCoin();

	const result = [];
	await knex('coins')
		.update({ 'total_coins': parseFloat(coins[0].total_coins) + parseFloat(total) })
		.then(data => {
			result.push(data);
		}
		);
	return result;
}
module.exports = { postBilling, getInventory, checkCoin }
