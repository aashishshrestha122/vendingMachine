const express = require("express");
const router = express.Router();

const billingController = require('../controllers/billingController');

const { checkChange } = require('../middleware/checkChange');
const { checkInventory } = require('../middleware/checkInventory');
/**
 * POST /api/billing/
 */
router.post('/', checkChange, checkInventory, billingController.postBilling);

module.exports = router;