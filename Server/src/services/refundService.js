const pool = require('../db');
const mysql = require('mysql2');

const checkCoin = require('./billingService');

const postRefund = async (data) => {
	const { item_id, cost_price, return_quantity, bill_id, created_by } = data;

	return new Promise(async (resolve, reject) => {
		try {

			var refund_total = parseFloat(return_quantity) * parseFloat(cost_price);

			const refund_sql = `INSERT INTO refund
													(
														billing_id,
														item_id,
														item_price,
														refund_qty,
														refund_total,
														created_by,
														created_on,
														updated_by,
														updated_on
													)
													VALUES
													(
														${mysql.escape(bill_id)},
														${mysql.escape(item_id)},
														${mysql.escape(cost_price)},
														${mysql.escape(return_quantity)},
														${mysql.escape(refund_total)},
														${mysql.escape(created_by)},
														NOW(),
														${mysql.escape(created_by)},
														NOW()
													)`;

			var update_inventory = `UPDATE item_inventory SET item_quantity = item_quantity  + ${return_quantity} WHERE item_id = ${item_id}`;

			var update_coins = `UPDATE coins SET total_coins = total_coins - ${refund_total}`;

			var update_billing = `UPDATE billing SET is_refunded = 1 WHERE billing_id = ${bill_id}`;

			const [result] = await pool.promise().query(refund_sql);
			if (result) {

				const [updateInventory] = await pool.promise().query(update_inventory);

				const [updateCoins] = await pool.promise().query(update_coins);

				const [updateBilling] = await pool.promise().query(update_billing);

				return resolve({ return_quantity: return_quantity, return_amount: refund_total });

			} else {
				return reject("Invalid billing id");
			}
		} catch (err) {
			return reject(err);
		}
	})
}

const getCostPrice = async (item_id) => {
	var sql = `SELECT item_price as cost_price FROM item_inventory WHERE item_id = ${item_id} `;
	const [result] = await pool.promise().query(sql);
	return result[0].cost_price;
}

const checkBilling = async (bill_id) => {
	var select_query = `SELECT
															b.billing_id, b.item_id AS id,
															ii.item_price
													FROM
															billing b
															LEFT JOIN item_inventory ii on ii.item_id = b.item_id
													WHERE b.billing_id = ${bill_id} and b.is_refunded is null`;
	const [result] = await pool.promise().query(select_query);
	return result;
}
module.exports = { postRefund, getCostPrice, checkBilling }
