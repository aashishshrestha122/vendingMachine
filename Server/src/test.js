const billingService = require('./services/billingService');

test(('returns the total coins'), () => {
	expect(billingService.checkCoin());
});
