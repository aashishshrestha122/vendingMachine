const pool = require('../db');
const mysql = require('mysql2');

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
	const sql = `SELECT ii.item_id as id,ii.item_quantity,ii.item_price,i.item_name as name FROM item_inventory ii
							LEFT JOIN items i on i.item_id = ii.item_id`;
	const [result] = await pool.promise().query(sql);
	return result;
}

const checkCoin = async () => {
	const sql = `SELECT total_coins from coins`;
	const [result] = await pool.promise().query(sql);
	return result[0].total_coins;
}

const updateCoins = async (total) => {
	const update_coins = `update coins set total_coins = total_coins + ${total}`;
	const [result] = await pool.promise().query(update_coins);
	return result;
}
module.exports = { postBilling, getInventory, checkCoin }
