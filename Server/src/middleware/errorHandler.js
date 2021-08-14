const HttpStatus = require('http-status-codes');
/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
	console.log(err);
	res.json({ err });
}

module.exports = { genericErrorHandler }