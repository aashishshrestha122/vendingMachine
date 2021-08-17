const pool = require('../db');
const mysql = require('mysql2');
const knex = require('../../knex/knex');

const postBilling = async (data) => {
	const { item_id, item_price, sold_qty, total, created_by, change } = data;

	const actualPrice = parseFloat(item_price) * parseInt(sold_qty);

	return new Promise(async (resolve, reject) => {
		if (parseFloat(total) >= parseFloat(actualPrice)) {
			try {
				const update_query = `update item_inventory set item_quantity = item_quantity - ${sold_qty} where item_id = ${item_id}`;

				const query = `INSERT INTO billing
								(
									date,
									item_id,
									item_price,
									sold_qty,
									total,
									created_by,
									created_on,
									updated_by,
									updated_on
								)
								VALUES
								(
									NOW(),
									${mysql.escape(item_id)},
									${mysql.escape(item_price)},
									${mysql.escape(parseInt(sold_qty))},
									${mysql.escape(total)},
									${mysql.escape(created_by)},
									NOW(),
									${mysql.escape(created_by)},
									NOW()
								)`;
				const [result] = await pool.promise().query(query);
				if (result.insertId) {
					const [update] = await pool.promise().query(update_query);

					const updatecoin = await updateCoins(actualPrice);
					return resolve({ amount_received: total, total: actualPrice, change: change });
				}
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
	const update_coins = `update coins set total_coins = total_coins + ${total}`;
	const [result] = await pool.promise().query(update_coins);
	return result;
}
module.exports = { postBilling, getInventory, checkCoin }
