const pool = require('../db');
const mysql = require('mysql2');
const knex = require('../../knex/knex');

const billingService = require('./billingService');

const postRefund = async (data) => {
	const { item_id, cost_price, return_quantity, bill_id, created_by } = data;

	return new Promise(async (resolve, reject) => {
		try {

			const coins = await billingService.checkCoin();

			var refund_total = parseFloat(return_quantity) * parseFloat(cost_price);

			var m = new Date();
			var date = m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

			return await knex.transaction(async function (t) {
				return t("refund")
					.insert(
						{
							'billing_id': bill_id,
							'item_id': item_id,
							'item_price': cost_price,
							'refund_qty': return_quantity,
							'refund_total': refund_total,
							'created_by': created_by,
							'created_on': date,
							'updated_by': created_by,
							'updated_on': date
						}
					)

					.then(async function (response) {
						if (response.length) {
							return t('item_inventory').select('item_quantity').where('item_id', item_id)
						}
					})
					.then(async function (itemQuantity) {
						if (itemQuantity.length) {
							const quantity = itemQuantity[0].item_quantity;
							return t('item_inventory')
								.update({
									'item_quantity': parseInt(quantity) + parseInt(return_quantity)
								})
								.where({ 'item_id': item_id })
						}
					})
					.then(async function (updateQuantity) {
						if (updateQuantity) {
							return t('coins')
								.update({
									'total_coins': coins[0].total_coins - parseInt(refund_total)
								})
						}
					})
					.then(async function (updateCoins) {
						if (updateCoins) {
							return t('billing')
								.update({
									'is_refunded': 1
								})
								.where({ 'item_id': item_id })
						}
					})
					.then(async function (updateBilling) {
						if (updateBilling) {
							return resolve({ return_quantity: return_quantity, return_amount: refund_total });
						} else {
							return reject('Oops! Something went wrong while updating billing')
						}
					})
					.then(t.commit)
					.catch(t.rollback)
			})
		} catch (err) {
			return reject(err);
		}
	})
}

const checkBilling = async (bill_id) => {
	const result = [];

	await knex.select(
		'b.billing_id', 'b.item_id AS id', 'ii.item_price', 'b.is_refunded'
	)
		.from('billing as b')
		.leftJoin('item_inventory as ii', 'ii.item_id', 'b.item_id')
		.where({ 'b.billing_id': bill_id })
		.then(data => {
			data.forEach(function (value) {
				result.push(value)
			});
		}
		);
	return result;

}
module.exports = { postRefund, checkBilling }
