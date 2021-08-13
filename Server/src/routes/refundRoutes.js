const express = require("express");
const router = express.Router();

const { checkCoins } = require('../middleware/checkCoins');

const refundController = require('../controllers/refundController');

/**
 * POST /api/refund/
 */
router.post('/', checkCoins, refundController.postRefund);

module.exports = router;